
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyDetailView from '@/components/PropertyDetailView';
import { FirebaseProperty } from '@/types';
import { mockProperties } from '@/data/properties';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<FirebaseProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from Firebase
    // Simulating API call to fetch property details
    setTimeout(() => {
      // Find the mock property
      const mockProperty = mockProperties.find(p => p.id === id);
      
      if (mockProperty) {
        // Convert to Firebase format
        const firebaseProperty: FirebaseProperty = {
          id: mockProperty.id,
          name: mockProperty.title,
          description: mockProperty.description,
          price: mockProperty.price.toString(),
          image_urls: mockProperty.images,
          location: {
            latitude: mockProperty.location.coordinates?.lat || 13.146742,
            longitude: mockProperty.location.coordinates?.lng || 78.1357638,
          },
          area_points: [
            { latitude: 13.14688880681415, longitude: 78.13561622053385 },
            { latitude: 13.146736663082857, longitude: 78.13557095825672 },
            { latitude: 13.146719359176121, longitude: 78.1356581300497 },
            { latitude: 13.14686170825948, longitude: 78.13571009784937 }
          ],
          email: "r.tejas@gmail.com",
          phone: "6360991933",
          uploaded_at: new Date().toISOString()
        };
        
        setProperty(firebaseProperty);
      }
      
      setLoading(false);
    }, 800);
    
    // Scroll to top when viewing property details
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="glass-morphism rounded-xl p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-white animate-spin mb-4"></div>
            <p className="text-white/80">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="glass-morphism rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
            <p className="text-white/80 mb-6">We couldn't find the property you're looking for.</p>
            <Link 
              to="/properties" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      <PropertyDetailView property={property} />
      <Footer />
    </div>
  );
};

export default PropertyDetails;
