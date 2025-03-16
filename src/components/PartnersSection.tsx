
import { useState, useEffect, useRef } from 'react';

// Mock partners data with placeholder images
const partners = [
  { id: 1, name: "Goldman Investments", logo: "https://placehold.co/200x80/2563eb/FFFFFF/svg?text=Goldman" },
  { id: 2, name: "Skyline Properties", logo: "https://placehold.co/200x80/8b5cf6/FFFFFF/svg?text=Skyline" },
  { id: 3, name: "Azure Development", logo: "https://placehold.co/200x80/ec4899/FFFFFF/svg?text=Azure" },
  { id: 4, name: "Metropolitan Homes", logo: "https://placehold.co/200x80/10b981/FFFFFF/svg?text=Metro" },
  { id: 5, name: "Pinnacle Group", logo: "https://placehold.co/200x80/f59e0b/FFFFFF/svg?text=Pinnacle" },
  { id: 6, name: "Elite Realty", logo: "https://placehold.co/200x80/6366f1/FFFFFF/svg?text=Elite" }
];

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-gray-900/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-display font-semibold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Trusted Partners
          </h2>
          <p className={`text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Collaborating with the leading names in the real estate and financial sectors.
          </p>
        </div>
        
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="neo-blur rounded-lg p-4 flex items-center justify-center h-24 hover:bg-white/5 transition-all duration-300 transform hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
