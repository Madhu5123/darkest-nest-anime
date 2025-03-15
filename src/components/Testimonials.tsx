
import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

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

  return (
    <section 
      ref={sectionRef}
      className={`py-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Client Testimonials</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience with LuxEstate.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-4 left-0 opacity-40 text-white">
            <Quote size={60} />
          </div>
          
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden h-80">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full h-full glass-morphism rounded-xl p-8 transition-all duration-500 ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0 z-10'
                    : index < activeIndex
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className="flex flex-col h-full justify-between">
                  <p className="text-white/90 text-lg italic">{testimonial.content}</p>
                  
                  <div className="flex items-center mt-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-white/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-white' : 'bg-white/30'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
