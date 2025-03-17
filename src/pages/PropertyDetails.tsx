
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyDetailView from '@/components/PropertyDetailView';
import { useFirebase } from '@/contexts/FirebaseContext';

const PropertyDetails = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { getPropertyById } = useFirebase();

  // Fetch property details with React Query
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });

  if (isLoading) {
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
