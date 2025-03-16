
import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import FeaturesSection from '../components/FeaturesSection';
import PartnersSection from '../components/PartnersSection';
import ProcessSection from '../components/ProcessSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section with 3D Background */}
      <Suspense fallback={<LoadingSkeleton />}>
        <HeroSection />
      </Suspense>
      
      {/* Stats Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsSection />
      </Suspense>
      
      {/* Features Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturesSection />
      </Suspense>
      
      {/* Featured Properties Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProperties />
      </Suspense>
      
      {/* Process Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ProcessSection />
      </Suspense>
      
      {/* Testimonials Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <Testimonials />
      </Suspense>
      
      {/* Partners Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PartnersSection />
      </Suspense>
      
      {/* Call to Action Section */}
      <Suspense fallback={<LoadingSkeleton />}>
        <CallToAction />
      </Suspense>
      
      {/* Footer */}
      <Footer />
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
