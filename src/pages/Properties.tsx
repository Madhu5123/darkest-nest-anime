
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { FirebaseProperty, FirebasePropertyFilter } from '@/types';
import { mockProperties } from '@/data/properties';

const Properties = () => {
  const [properties, setProperties] = useState<FirebaseProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<FirebaseProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data from Firebase
    // In a real app, this would be an API call to your Firebase backend
    setTimeout(() => {
      // Convert mock properties to Firebase format for demonstration
      const firebaseProps = mockProperties.map((p, index) => ({
        id: p.id,
        name: p.title,
        description: p.description,
        price: p.price.toString(),
        image_urls: p.images,
        location: {
          latitude: p.location.coordinates?.lat || 13.146742 + (index * 0.001),
          longitude: p.location.coordinates?.lng || 78.1357638 + (index * 0.001),
        },
        area_points: [
          { latitude: 13.14688880681415, longitude: 78.13561622053385 },
          { latitude: 13.146736663082857, longitude: 78.13557095825672 },
          { latitude: 13.146719359176121, longitude: 78.1356581300497 },
          { latitude: 13.14686170825948, longitude: 78.13571009784937 }
        ],
        email: "property@example.com",
        phone: "1234567890",
        uploaded_at: new Date().toISOString(),
      }));
      
      setProperties(firebaseProps);
      setFilteredProperties(firebaseProps);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters: FirebasePropertyFilter) => {
    let filtered = [...properties];

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        property =>
          property.name.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by location
    if (filters.location) {
      const locationTerm = filters.location.toLowerCase();
      filtered = filtered.filter(
        property => property.description.toLowerCase().includes(locationTerm)
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(
        property => parseInt(property.price) >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        property => parseInt(property.price) <= parseInt(filters.maxPrice)
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-morphism rounded-xl p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">Properties</h1>
            <p className="text-white/70">Browse our selection of premium properties</p>
          </div>
          
          <PropertyFilters onFilterChange={handleFilterChange} />
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={{
                    id: property.id,
                    title: property.name,
                    description: property.description,
                    price: parseInt(property.price),
                    images: property.image_urls,
                    beds: 3, // Default values since Firebase format doesn't have these
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
              ))}
            </div>
          ) : (
            <div className="glass-morphism rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-white/70">Try adjusting your filters to find more properties.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
