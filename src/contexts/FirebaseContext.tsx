import { createContext, useContext, ReactNode } from 'react';
import { db, storage, auth, rtdb } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  setDoc,
  deleteDoc,
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { ref, get, query as rtdbQuery, orderByChild, startAt, endAt, limitToFirst } from 'firebase/database';
import { FirebaseProperty, FirebasePropertyFilter } from '@/types';

type FirebaseContextType = {
  getProperties: (filters?: FirebasePropertyFilter) => Promise<FirebaseProperty[]>;
  getPropertyById: (id: string) => Promise<FirebaseProperty | null>;
  getLandsFromRealtime: (searchQuery?: string, limit?: number) => Promise<FirebaseProperty[]>;
  auth: typeof auth;
  getUserFavorites: (userId: string) => Promise<FirebaseProperty[]>;
  addToFavorites: (userId: string, propertyId: string) => Promise<void>;
  removeFromFavorites: (userId: string, propertyId: string) => Promise<void>;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  // Function to get properties with optional filtering
  const getProperties = async (filters?: FirebasePropertyFilter): Promise<FirebaseProperty[]> => {
    try {
      const propertiesRef = collection(db, 'properties');
      const constraints: QueryConstraint[] = [];
      
      if (filters) {
        if (filters.search) {
          constraints.push(where('name', '>=', filters.search));
        }
        
        if (filters.location) {
          constraints.push(where('location.city', '==', filters.location));
        }
        
        if (filters.minPrice) {
          constraints.push(where('price', '>=', filters.minPrice));
        }
        
        if (filters.maxPrice) {
          constraints.push(where('price', '<=', filters.maxPrice));
        }
        
        if (filters.propertyType) {
          constraints.push(where('propertyType', '==', filters.propertyType));
        }
      }
      
      constraints.push(orderBy('uploaded_at', 'desc'));
      
      const q = query(propertiesRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      const properties: FirebaseProperty[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        properties.push({
          id: doc.id,
          name: data.name || '',
          description: data.description || '',
          price: data.price || '0',
          image_urls: data.image_urls || [],
          location: data.location || { latitude: 0, longitude: 0 },
          area_points: data.area_points || [],
          email: data.email || '',
          phone: data.phone || '',
          uploaded_at: data.uploaded_at || new Date().toISOString(),
        });
      });
      
      return properties;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  };
  
  // Function to get a single property by ID
  const getPropertyById = async (id: string): Promise<FirebaseProperty | null> => {
    try {
      const propertyRef = doc(db, 'properties', id);
      const propertySnap = await getDoc(propertyRef);
      
      if (propertySnap.exists()) {
        const data = propertySnap.data() as DocumentData;
        return {
          id: propertySnap.id,
          name: data.name || '',
          description: data.description || '',
          price: data.price || '0',
          image_urls: data.image_urls || [],
          location: data.location || { latitude: 0, longitude: 0 },
          area_points: data.area_points || [],
          email: data.email || '',
          phone: data.phone || '',
          uploaded_at: data.uploaded_at || new Date().toISOString(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  };
  
  // Function to get lands from Firebase Realtime Database
  const getLandsFromRealtime = async (searchQuery?: string, resultLimit: number = 3): Promise<FirebaseProperty[]> => {
    try {
      const landsRef = ref(rtdb, 'lands');
      let landsQuery;
      
      if (searchQuery) {
        landsQuery = rtdbQuery(
          landsRef,
          orderByChild('name'),
          startAt(searchQuery),
          endAt(searchQuery + '\uf8ff'),
          limitToFirst(resultLimit)
        );
      } else {
        landsQuery = rtdbQuery(
          landsRef,
          limitToFirst(resultLimit)
        );
      }
      
      const snapshot = await get(landsQuery);
      const lands: FirebaseProperty[] = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const land = childSnapshot.val();
          lands.push({
            id: childSnapshot.key || '',
            name: land.name || '',
            description: land.description || '',
            price: land.price || '0',
            image_urls: land.image_urls || [],
            location: land.location || { latitude: 0, longitude: 0 },
            area_points: land.area_points || [],
            email: land.email || '',
            phone: land.phone || '',
            uploaded_at: land.uploaded_at || new Date().toISOString(),
          });
        });
      }
      
      return lands;
    } catch (error) {
      console.error('Error fetching lands from Realtime Database:', error);
      return [];
    }
  };
  
  // Function to get a user's favorite properties
  const getUserFavorites = async (userId: string): Promise<FirebaseProperty[]> => {
    try {
      const userFavoritesRef = doc(db, 'userFavorites', userId);
      const userFavoritesSnap = await getDoc(userFavoritesRef);
      
      if (!userFavoritesSnap.exists()) {
        return [];
      }
      
      const favoritesData = userFavoritesSnap.data();
      const favoriteIds = favoritesData.propertyIds || [];
      
      if (favoriteIds.length === 0) {
        return [];
      }
      
      const favorites: FirebaseProperty[] = [];
      
      for (const id of favoriteIds) {
        const property = await getPropertyById(id);
        if (property) {
          favorites.push(property);
        }
      }
      
      return favorites;
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      return [];
    }
  };
  
  // Function to add a property to favorites
  const addToFavorites = async (userId: string, propertyId: string): Promise<void> => {
    try {
      const userFavoritesRef = doc(db, 'userFavorites', userId);
      const userFavoritesSnap = await getDoc(userFavoritesRef);
      
      if (!userFavoritesSnap.exists()) {
        await setDoc(userFavoritesRef, {
          propertyIds: [propertyId],
          userId,
          updatedAt: new Date().toISOString(),
        });
      } else {
        const favoritesData = userFavoritesSnap.data();
        const favoriteIds = favoritesData.propertyIds || [];
        
        if (!favoriteIds.includes(propertyId)) {
          await setDoc(userFavoritesRef, {
            propertyIds: [...favoriteIds, propertyId],
            userId,
            updatedAt: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };
  
  // Function to remove a property from favorites
  const removeFromFavorites = async (userId: string, propertyId: string): Promise<void> => {
    try {
      const userFavoritesRef = doc(db, 'userFavorites', userId);
      const userFavoritesSnap = await getDoc(userFavoritesRef);
      
      if (userFavoritesSnap.exists()) {
        const favoritesData = userFavoritesSnap.data();
        const favoriteIds = favoritesData.propertyIds || [];
        
        const updatedFavoriteIds = favoriteIds.filter((id: string) => id !== propertyId);
        
        await setDoc(userFavoritesRef, {
          propertyIds: updatedFavoriteIds,
          userId,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };
  
  return (
    <FirebaseContext.Provider value={{ 
      getProperties, 
      getPropertyById, 
      getLandsFromRealtime,
      auth,
      getUserFavorites,
      addToFavorites,
      removeFromFavorites
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
