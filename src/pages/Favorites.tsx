
import React, { useState, useEffect } from 'react';
import { Heart, Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/contexts/FirebaseContext';
import { FirebaseProperty } from '@/types';

const Favorites = () => {
  const [favorites, setFavorites] = useState<FirebaseProperty[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState<FirebaseProperty[]>([]);
  const { getProperties } = useFirebase();

  // In a real app, this would fetch the user's favorites from Firebase
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // This is a mock implementation
        // In a real app, we would filter properties based on user's favorites
        const properties = await getProperties();
        // Mock: Take first 4 properties as favorites
        const mockFavorites = properties.slice(0, 4);
        setFavorites(mockFavorites);
        setFilteredFavorites(mockFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [getProperties]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFavorites(favorites);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = favorites.filter(
      property => 
        property.name.toLowerCase().includes(query) || 
        property.description.toLowerCase().includes(query)
    );

    setFilteredFavorites(filtered);
  }, [searchQuery, favorites]);

  const handleRemoveFavorite = (id: string) => {
    // In a real app, this would remove the property from the user's favorites in Firebase
    setFavorites(prev => prev.filter(property => property.id !== id));
    setFilteredFavorites(prev => prev.filter(property => property.id !== id));
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="glass-morphism rounded-xl p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2 flex items-center">
            <Heart className="mr-3 text-pink-500" /> My Favorites
          </h1>
          <p className="text-white/70">Your saved properties</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <Input
              type="text"
              placeholder="Search your favorites..."
              className="pl-10 pr-10 py-6 bg-black/30 border-white/10 text-white rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                onClick={clearSearch}
              >
                <X size={18} />
              </Button>
            )}
          </div>
        </div>
        
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFavorites.map((property, index) => (
              <div key={property.id} className="relative group">
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFavorite(property.id)}
                >
                  <X size={16} />
                </Button>
                <PropertyCard 
                  key={property.id} 
                  property={{
                    id: property.id,
                    title: property.name,
                    description: property.description,
                    price: parseInt(property.price),
                    images: property.image_urls,
                    beds: 3, // Default values
                    baths: 2,
                    area: 1500,
                    location: {
                      address: "Sample Address",
                      city: "Sample City",
                      state: "Sample State",
                      zip: "12345",
                      coordinates: {
                        lat: property.location.latitude,
                        lng: property.location.longitude
                      }
                    },
                    status: 'For Sale',
                    propertyType: 'Land',
                    yearBuilt: 2022,
                    features: ['Sample Feature 1', 'Sample Feature 2'],
                  }}
                  index={index} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-morphism rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No favorites found</h3>
            {searchQuery ? (
              <p className="text-white/70">No properties match your search criteria.</p>
            ) : (
              <p className="text-white/70">You haven't added any properties to your favorites yet.</p>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Favorites;
