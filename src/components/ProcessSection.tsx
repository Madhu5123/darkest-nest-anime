
import { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle, Home, Key } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search Properties',
    description: 'Browse our extensive catalog of premium properties across various locations.',
    icon: Search,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Choose & Verify',
    description: 'Select your ideal property and complete verification with our experts.',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Property Tour',
    description: 'Schedule virtual or in-person tours to see your potential new home.',
    icon: Home,
    color: 'bg-amber-500'
  },
  {
    id: 4,
    title: 'Get Your Keys',
    description: 'Complete the purchase process and receive the keys to your new property.',
    icon: Key,
    color: 'bg-purple-500'
  }
];

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Animate through steps when section is visible
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90 z-0"></div>
      <div className="absolute -right-32 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-display font-semibold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            How It Works
          </h2>
          <p className={`text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A simple four-step process to your dream property.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Process timeline */}
          <div className={`relative mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Connector line */}
            <div className="absolute top-9 left-0 right-0 h-1 bg-white/10"></div>
            
            {/* Steps */}
            <div className="relative z-10 flex justify-between">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
                      activeStep === index 
                        ? `${step.color} scale-110 shadow-lg shadow-${step.color}/20` 
                        : 'bg-white/10'
                    }`}
                  >
                    <step.icon 
                      size={32} 
                      className={`transition-all duration-300 ${
                        activeStep === index ? 'scale-110' : 'opacity-60'
                      }`}
                    />
                  </div>
                  <div className="text-center mt-4 w-32">
                    <h4 className={`font-semibold transition-all duration-300 ${
                      activeStep === index ? 'text-white' : 'text-white/70'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-1 transition-all duration-300 ${
                      activeStep === index ? 'text-white/90' : 'text-white/50'
                    }`}>
                      Step {step.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current step details */}
          <div className={`glass-morphism rounded-xl p-8 text-center max-w-2xl mx-auto transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h3 className="text-2xl font-semibold mb-3">{steps[activeStep].title}</h3>
            <p className="text-white/80">{steps[activeStep].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
