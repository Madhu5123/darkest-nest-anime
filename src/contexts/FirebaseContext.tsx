
import { createContext, useContext, ReactNode } from 'react';
import { db, storage, auth } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { FirebaseProperty, FirebasePropertyFilter } from '@/types';

type FirebaseContextType = {
  getProperties: (filters?: FirebasePropertyFilter) => Promise<FirebaseProperty[]>;
  getPropertyById: (id: string) => Promise<FirebaseProperty | null>;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  // Function to get properties with optional filtering
  const getProperties = async (filters?: FirebasePropertyFilter): Promise<FirebaseProperty[]> => {
    try {
      const propertiesRef = collection(db, 'properties');
      const constraints: QueryConstraint[] = [];
      
      // Apply filters if provided
      if (filters) {
        // Add search filter (name or description)
        if (filters.search) {
          // Firebase doesn't support OR queries directly, so we'd need to use composite indexing
          // or make multiple queries in a real app
          constraints.push(where('name', '>=', filters.search));
        }
        
        // Add location filter
        if (filters.location) {
          constraints.push(where('location.city', '==', filters.location));
        }
        
        // Add price range filters
        if (filters.minPrice) {
          constraints.push(where('price', '>=', filters.minPrice));
        }
        
        if (filters.maxPrice) {
          constraints.push(where('price', '<=', filters.maxPrice));
        }
        
        // Add property type filter
        if (filters.propertyType) {
          constraints.push(where('propertyType', '==', filters.propertyType));
        }
      }
      
      // Add default ordering
      constraints.push(orderBy('uploaded_at', 'desc'));
      
      // Execute query
      const q = query(propertiesRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      // Process results
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
  
  return (
    <FirebaseContext.Provider value={{ getProperties, getPropertyById }}>
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
