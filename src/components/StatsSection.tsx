
import { useEffect, useRef, useState } from 'react';
import { Building, Users, Award, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const stats = [
  {
    label: 'Properties Managed',
    value: 998,
    icon: Building,
    suffix: '+',
    color: 'from-blue-500/20 to-blue-300/10'
  },
  {
    label: 'Happy Clients',
    value: 27,
    icon: Users,
    suffix: '+',
    color: 'from-purple-500/20 to-purple-300/10'
  },
  {
    label: 'Years Experience',
    value: 126,
    icon: Award,
    suffix: '+',
    color: 'from-amber-500/20 to-amber-300/10'
  },
  {
    label: 'Cities Covered',
    value: 120,
    icon: Home,
    suffix: '+',
    color: 'from-emerald-500/20 to-emerald-300/10'
  }
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
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

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      const duration = 2000; // 2 seconds animation
      const steps = 20; // number of steps
      const stepValue = stat.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        if (currentStep < steps) {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.ceil(stepValue * (currentStep + 1));
            return newCounts;
          });
          currentStep++;
        } else {
          clearInterval(intervals[index]);
        }
      }, duration / steps);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 overflow-hidden relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-2 text-gradient">Our Performance</h2>
          <p className="text-white/70 max-w-2xl mx-auto">The numbers that define our success and experience in the real estate industry</p>
          <div className="flex justify-center mt-4">
            <Separator className="w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent h-[1px]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`glass-morphism rounded-xl p-6 transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl sm:text-4xl font-display font-semibold">
                  {counts[index].toLocaleString()}
                </span>
                <span className="text-3xl sm:text-4xl font-display font-semibold ml-1">{stat.suffix}</span>
              </div>
              <p className="text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
