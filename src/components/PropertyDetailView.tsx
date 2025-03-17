
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bed, Bath, Square, MapPin, Calendar, Home, Tag, Check } from 'lucide-react';
import { FirebaseProperty } from '@/types';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import PropertyMap from './PropertyMap';

interface PropertyDetailViewProps {
  property: FirebaseProperty;
}

const PropertyDetailView = ({ property }: PropertyDetailViewProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out this property: ${property.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
                src={property.image_urls[activeImage]} 
                alt={property.name} 
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700"
              />
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-full">
            {property.image_urls.slice(0, 4).map((image, index) => (
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
                  <h1 className="text-2xl md:text-3xl font-display font-semibold">{property.name}</h1>
                  <div className="flex items-center text-white/70 mt-2">
                    <MapPin size={18} className="mr-2" />
                    <span>
                      Lat: {property.location.latitude.toFixed(6)}, 
                      Lng: {property.location.longitude.toFixed(6)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-display font-semibold">₹{parseInt(property.price).toLocaleString()}</div>
                </div>
              </div>
              
              {/* Key features */}
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Tag size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">Land</span>
                  <span className="text-sm text-white/70">Property Type</span>
                </div>
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Calendar size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">{new Date(property.uploaded_at).getFullYear()}</span>
                  <span className="text-sm text-white/70">Listed</span>
                </div>
                <div className="flex flex-col items-center p-3 neo-blur rounded-lg">
                  <Square size={22} className="mb-1 text-white/80" />
                  <span className="font-semibold">Agricultural</span>
                  <span className="text-sm text-white/70">Land Use</span>
                </div>
              </div>
              
              <Separator className="my-6 bg-white/10" />
              
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-white/80 leading-relaxed">{property.description}</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Property Location & Area</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <PropertyMap 
                  center={property.location} 
                  areaPoints={property.area_points} 
                />
              </div>
              <p className="mt-3 text-sm text-white/70">
                Latitude: {property.location.latitude.toFixed(6)}, 
                Longitude: {property.location.longitude.toFixed(6)}
              </p>
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
                    defaultValue={`Hi, I'm interested in ${property.name}. Please contact me.`}
                  />
                </div>
                <Button className="w-full">Send Inquiry</Button>
              </form>
            </div>
            
            {/* Property Owner details */}
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <Home size={18} className="mr-2" />
                    <span>Contact Person</span>
                  </div>
                  <span className="font-semibold">{property.name.split(' ')[0]}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <span className="mr-2">📧</span>
                    <span>Email</span>
                  </div>
                  <span className="font-semibold">{property.email}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <span className="mr-2">📱</span>
                    <span>Phone</span>
                  </div>
                  <span className="font-semibold">{property.phone}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-white/70">
                    <Calendar size={18} className="mr-2" />
                    <span>Listed On</span>
                  </div>
                  <span className="font-semibold">
                    {new Date(property.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
