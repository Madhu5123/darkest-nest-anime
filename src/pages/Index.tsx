
import { Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import CallToAction from '../components/CallToAction';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section with 3D Background */}
      <Suspense fallback={<LoadingSkeleton />}>
        <HeroSection />
      </Suspense>
      
      {/* Featured Properties Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProperties />
      </Suspense>
      
      {/* Call to Action Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <CallToAction />
      </Suspense>
    </div>
  );
};

// Loading skeleton for suspense boundaries
const LoadingSkeleton = () => (
  <div className="w-full py-20">
    <div className="container mx-auto px-4">
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Index;
