
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Send
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const offices = [
    {
      city: 'New York',
      address: '123 Broadway, New York, NY 10001',
      phone: '+1 (212) 555-7890',
      email: 'newyork@luxestate.com',
      hours: 'Mon-Fri: 9AM-6PM'
    },
    {
      city: 'Los Angeles',
      address: '456 Sunset Blvd, Los Angeles, CA 90028',
      phone: '+1 (310) 555-6789',
      email: 'la@luxestate.com',
      hours: 'Mon-Fri: 9AM-6PM'
    },
    {
      city: 'Miami',
      address: '789 Ocean Drive, Miami, FL 33139',
      phone: '+1 (305) 555-5678',
      email: 'miami@luxestate.com',
      hours: 'Mon-Fri: 9AM-6PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Contact Us</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have questions about our properties or services? Our team is here to help.
              Get in touch with us and we'll respond as soon as possible.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="glass-morphism rounded-xl p-8 animate-fade-in animation-delay-100">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                <h2 className="text-2xl font-semibold">Send Us a Message</h2>
              </div>
              
              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-white/90">
                    Your message has been sent successfully. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Property Inquiry"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      required
                      className="w-full rounded-md bg-white/5 border border-white/10 p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in animation-delay-200">
              {/* Map Placeholder */}
              <div className="glass-morphism rounded-xl overflow-hidden h-64">
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <p className="text-white/70">Interactive map will be displayed here</p>
                </div>
              </div>
              
              {/* Offices */}
              <div className="glass-morphism rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Our Offices</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {offices.map((office, index) => (
                    <div key={index} className="glass-morphism rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{office.city}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-1 text-primary" />
                          <span className="text-white/80">{office.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-white/80">{office.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-white/80">{office.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-white/80">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* FAQ Preview */}
              <div className="glass-morphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
                  <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                    View All FAQs
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="glass-morphism rounded-lg p-4">
                    <h3 className="font-medium mb-2">How do I schedule a property viewing?</h3>
                    <p className="text-sm text-white/70">
                      You can schedule a property viewing by contacting our team through this form, 
                      calling our office, or requesting a viewing directly from the property page.
                    </p>
                  </div>
                  
                  <div className="glass-morphism rounded-lg p-4">
                    <h3 className="font-medium mb-2">What documents do I need to rent a property?</h3>
                    <p className="text-sm text-white/70">
                      Typically, you'll need identification, proof of income, employment verification, 
                      and references from previous landlords.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="glass-morphism rounded-xl overflow-hidden animate-fade-in animation-delay-300">
            <div className="relative p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-6">
                  Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    placeholder="Your email address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
