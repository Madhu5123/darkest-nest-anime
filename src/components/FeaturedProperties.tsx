
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { mockProperties } from '../data/properties';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProperties(mockProperties.slice(0, 3));
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Featured Properties</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our hand-picked selection of premium properties that represent the pinnacle of luxury living.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
        
        <div className="text-center">
          <Button
            asChild
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 group"
          >
            <Link to="/properties">
              View All Properties
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
