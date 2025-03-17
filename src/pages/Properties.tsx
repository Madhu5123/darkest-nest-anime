
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { FirebaseProperty, FirebasePropertyFilter } from '@/types';
import { useFirebase } from '@/contexts/FirebaseContext';

const Properties = () => {
  const { getProperties } = useFirebase();
  const [filters, setFilters] = useState<FirebasePropertyFilter>({
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: ''
  });

  // Fetch properties with React Query
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => getProperties(filters),
  });

  const handleFilterChange = (newFilters: FirebasePropertyFilter) => {
    setFilters(newFilters);
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
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property, index) => (
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
