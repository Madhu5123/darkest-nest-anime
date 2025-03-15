
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bed, Bath, Square, MapPin, Calendar, Home, Tag, Check } from 'lucide-react';
import { mockProperties } from '../data/properties';
import { Property } from '../types';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from an API based on the ID
    const foundProperty = mockProperties.find(p => p.id === id);
    
    // Simulate loading
    setTimeout(() => {
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
    
    // Scroll to top when viewing property details
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-morphism rounded-xl p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-white animate-spin mb-4"></div>
          <p className="text-white/80">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-morphism rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
          <p className="text-white/80 mb-6">We couldn't find the property you're looking for.</p>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Back button and actions */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/properties" 
            className="flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Properties</span>
          </Link>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 hover:bg-white/10"
              onClick={toggleFavorite}
            >
              <Heart 
                size={18} 
                className={favorited ? "fill-red-500 text-red-500 mr-2" : "mr-2"} 
              />
              <span>{favorited ? 'Saved' : 'Save'}</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 size={18} className="mr-2" />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        {/* Property images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          {/* Main image */}
          <div className="lg:col-span-8 perspective-container">
            <div className="property-card-3d glass-morphism rounded-xl overflow-hidden">
              <img 
                src={property.images[activeImage]} 
                alt={property.title} 
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700"
              />
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-full">
            {property.images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className={`cursor-pointer glass-morphism rounded-xl overflow-hidden transition-all duration-300 ${
                  activeImage === index ? 'ring-2 ring-white' : 'opacity-80'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Property view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Main details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-morphism rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-semibold">{property.title}</h1>
                  <div className="flex items-center text-white/70 mt-2">
                    <MapPin size={18} className="mr-2" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-display font-semibold">${property.price.toLocaleString()}</div>
                  {property.pricePerSqFt && (
                    <div className="text-white/70 text-sm">${property.pricePerSqFt}/sq ft</div>
                  )}
                </div>
              </div>
              
              {/* Key features */}
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Bed size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">{property.beds}</span>
                  <span className="text-sm text-white/70">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Bath size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">{property.baths}</span>
                  <span className="text-sm text-white/70">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Square size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">{property.area.toLocaleString()}</span>
                  <span className="text-sm text-white/70">Sq Ft</span>
                </div>
              </div>
              
              <Separator className="my-6 bg-white/10" />
              
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-white/80 leading-relaxed">{property.description}</p>
              </div>
            </div>
            
            {/* Features */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-emerald-400 mr-2 shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Contact and additional info */}
          <div className="space-y-6">
            {/* Contact form */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                  >
                    {`Hi, I'm interested in ${property.title}. Please contact me.`}
                  </textarea>
                </div>
                <Button className="w-full">Send Inquiry</Button>
              </form>
            </div>
            
            {/* Property details */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <Home size={18} className="mr-2" />
                    <span>Property Type</span>
                  </div>
                  <span className="font-semibold">{property.propertyType}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <Calendar size={18} className="mr-2" />
                    <span>Year Built</span>
                  </div>
                  <span className="font-semibold">{property.yearBuilt}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <Tag size={18} className="mr-2" />
                    <span>Status</span>
                  </div>
                  <span className="font-semibold">{property.status}</span>
                </div>
                
                {property.garage && (
                  <div className="flex justify-between">
                    <div className="flex items-center text-white/70">
                      <span className="mr-2">🚗</span>
                      <span>Garage</span>
                    </div>
                    <span className="font-semibold">{property.garage} Car</span>
                  </div>
                )}
                
                {property.lotSize && (
                  <div className="flex justify-between">
                    <div className="flex items-center text-white/70">
                      <span className="mr-2">🏞️</span>
                      <span>Lot Size</span>
                    </div>
                    <span className="font-semibold">{property.lotSize} Sq Ft</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Map placeholder */}
            <div className="glass-morphism rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-white/5 rounded-lg h-40 flex items-center justify-center">
                <p className="text-white/70">Map will be displayed here</p>
              </div>
              <p className="mt-3 text-sm text-white/70">{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
