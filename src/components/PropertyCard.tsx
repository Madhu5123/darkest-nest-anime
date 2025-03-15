
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '../types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const [favorited, setFavorited] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorited(!favorited);
  };

  // Staggered animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timeout);
  }, [index]);

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "perspective-container transition-all duration-500 h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link to={`/properties/${property.id}`} className="block h-full">
        <div className="property-card-3d bg-black/30 glass-morphism rounded-xl overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
          {/* Image container */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="property-card-image w-full h-full object-cover"
            />
            
            {/* Price tag */}
            <div className="absolute bottom-4 left-4 glass-morphism py-1 px-3 rounded-full text-sm font-semibold">
              ${property.price.toLocaleString()}
            </div>
            
            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-morphism flex items-center justify-center group-hover:opacity-100 transition-opacity"
            >
              <Heart
                size={16}
                className={cn(
                  "transition-colors",
                  favorited ? "fill-red-500 text-red-500" : "text-white"
                )}
              />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <div className="flex items-center text-white/70 text-xs mb-2">
              <MapPin size={12} className="mr-1" />
              <span>{property.location.city}, {property.location.state}</span>
            </div>
            
            <h3 className="text-white font-medium mb-2 line-clamp-1">{property.title}</h3>
            
            {/* Features */}
            <div className="flex justify-between mt-4 text-white/80 text-sm">
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center">
                <Square size={16} className="mr-1" />
                <span>{property.area} Sq Ft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
