
import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    role: 'Home Buyer',
    content: 'LuxEstate helped me find my dream home in half the time I expected. Their attention to detail and understanding of my needs was exceptional.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Investor',
    content: 'As an investor, I need agents who understand market trends and property values. The team at LuxEstate has consistently delivered valuable insights and profitable investments.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'First-time Buyer',
    content: 'I was nervous about buying my first property, but LuxEstate made the process smooth and stress-free. They explained everything clearly and found me a perfect starter home.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-2 text-gradient">Client Testimonials</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover what our clients have to say about their experience with LuxEstate
          </p>
          <div className="flex justify-center mt-4">
            <Separator className="w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent h-[1px]" />
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto perspective-container">
          <div className="relative glass-morphism border border-white/10 rounded-xl p-8 md:p-12 shadow-xl">
            {/* Quote icon */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-white/20">
              <Quote size={48} />
            </div>
            
            {/* Testimonial slider */}
            <div className="relative overflow-hidden">
              <div className="flex relative transition-transform duration-700" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-white/10"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent opacity-70"></div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 text-center md:text-left">
                        <p className="text-lg md:text-xl text-white/90 italic mb-6">{testimonial.content}</p>
                        <h4 className="font-semibold text-white text-xl">{testimonial.name}</h4>
                        <p className="text-white/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-white/20 bg-black/30"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                    } rounded-full`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-white/20 bg-black/30"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
