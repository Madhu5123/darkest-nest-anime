
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import ThreeDScene from './ThreeDScene';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
        <ThreeDScene />
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className={`md:max-w-xl transform transition-all duration-700 ${scrolled ? 'translate-y-[-20px] opacity-0' : 'translate-y-0 opacity-100'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight mb-4">
            <span className="text-gradient block mb-2">Discover</span> 
            <span className="block">Your Dream Property</span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8">
            Explore our exclusive collection of luxury properties designed for those who appreciate the finest living spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <Button
              asChild
              size="lg" 
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-8"
            >
              <Link to="/properties">Browse Properties</Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer transition-all duration-500 ${scrolled ? 'opacity-0' : 'opacity-100 animate-pulse-light'}`}
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="animate-float" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
