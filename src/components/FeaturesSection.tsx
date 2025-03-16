
import { useState, useEffect, useRef } from 'react';
import { Home, Shield, Award, Zap, HeartHandshake, Key } from 'lucide-react';

const features = [
  {
    title: 'Premium Locations',
    description: 'Access to exclusive properties in the most sought-after neighborhoods and communities.',
    icon: Home,
    color: 'from-blue-500/20 to-blue-300/10'
  },
  {
    title: 'Secure Transactions',
    description: 'End-to-end encrypted payment processing with multiple verification layers.',
    icon: Shield,
    color: 'from-green-500/20 to-green-300/10'
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous quality checks for all properties listed on our platform.',
    icon: Award,
    color: 'from-amber-500/20 to-amber-300/10'
  },
  {
    title: 'Fast Processing',
    description: 'Streamlined property acquisition process with minimal waiting times.',
    icon: Zap,
    color: 'from-purple-500/20 to-purple-300/10'
  },
  {
    title: 'Expert Guidance',
    description: 'Access to real estate professionals who provide personalized advice.',
    icon: HeartHandshake,
    color: 'from-pink-500/20 to-pink-300/10'
  },
  {
    title: 'Custom Matching',
    description: 'AI-powered property recommendations based on your preferences.',
    icon: Key,
    color: 'from-cyan-500/20 to-cyan-300/10'
  }
];

const FeaturesSection = () => {
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90 z-0"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-display font-semibold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Why Choose <span className="text-gradient">LuxEstate</span>
          </h2>
          <p className={`text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Discover the advantages that make us the premier choice for luxury property solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`glass-morphism rounded-xl p-6 transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${100 + index * 150}ms` }}
            >
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${feature.color}`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
