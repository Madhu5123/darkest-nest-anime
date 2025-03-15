
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ctaRef}
      className={`py-20 relative transition-opacity duration-1000 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-black/50 z-0"></div>
      
      {/* Animated background shapes */}
      <div className="absolute top-0 right-0 opacity-20 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 opacity-20 w-80 h-80 rounded-full bg-blue-500/30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-morphism rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Ready to Find Your Dream Home?</h2>
          
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Let our expert team guide you through the process of finding the perfect property that meets all your requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-8"
            >
              <Link to="/properties">
                Browse Properties
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 group"
            >
              <Link to="/contact">
                Contact Us
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
