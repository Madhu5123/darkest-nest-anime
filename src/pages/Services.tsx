
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart, 
  Buildings, 
  FileText, 
  Camera, 
  Paintbrush,
  Compass,
  Key
} from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState<string>('property-management');
  
  const services = [
    {
      id: 'property-management',
      title: 'Property Management',
      icon: <Buildings className="w-10 h-10 mb-4 text-primary" />,
      description: 'Our comprehensive property management services ensure your investment is maintained to the highest standards while maximizing returns.',
      features: [
        'Tenant acquisition and screening',
        'Rent collection and financial reporting',
        'Property maintenance and repairs',
        '24/7 emergency response',
        'Regular property inspections',
        'Lease agreement management'
      ]
    },
    {
      id: 'investment-advisory',
      title: 'Investment Advisory',
      icon: <BarChart className="w-10 h-10 mb-4 text-primary" />,
      description: 'Our investment experts provide strategic guidance to help you make informed decisions about property investments.',
      features: [
        'Market analysis and trend forecasting',
        'Investment portfolio diversification',
        'ROI optimization strategies',
        'Risk assessment and management',
        'Capital growth opportunities',
        'Investment property selection'
      ]
    },
    {
      id: 'legal-services',
      title: 'Legal Services',
      icon: <FileText className="w-10 h-10 mb-4 text-primary" />,
      description: 'Navigate the complex world of real estate law with our expert legal team specialized in property transactions and disputes.',
      features: [
        'Property transaction documentation',
        'Title verification and due diligence',
        'Lease agreement preparation',
        'Dispute resolution and mediation',
        'Regulatory compliance guidance',
        'Land use and zoning consultation'
      ]
    },
    {
      id: 'photography',
      title: 'Professional Photography',
      icon: <Camera className="w-10 h-10 mb-4 text-primary" />,
      description: 'Showcase your property in the best light with our professional photography services designed to attract quality buyers and tenants.',
      features: [
        'High-resolution property photography',
        'Aerial drone photography',
        'Virtual tours and 3D walkthroughs',
        'Twilight and specialty shots',
        'Photo editing and enhancement',
        'Marketing-ready image packages'
      ]
    },
    {
      id: 'interior-design',
      title: 'Interior Design',
      icon: <Paintbrush className="w-10 h-10 mb-4 text-primary" />,
      description: 'Transform your property with our professional interior design services tailored to enhance appeal and value.',
      features: [
        'Space planning and optimization',
        'Color scheme and material selection',
        'Furniture and accessory curation',
        'Lighting design and implementation',
        'Renovation project management',
        'Home staging for sales'
      ]
    },
    {
      id: 'buying-guide',
      title: 'Property Buying Guide',
      icon: <Compass className="w-10 h-10 mb-4 text-primary" />,
      description: 'Let our experts guide you through the entire property buying process, from search to closing.',
      features: [
        'Personalized property searches',
        'Neighborhood analysis and guidance',
        'Property valuation and price negotiation',
        'Financing options and assistance',
        'Inspection coordination',
        'Closing process management'
      ]
    }
  ];

  const activeService = services.find(service => service.id === activeTab) || services[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 animate-fade-in">Our Services</h1>
            <p className="text-white/70 max-w-2xl mx-auto animate-fade-in animation-delay-100">
              We offer a comprehensive range of real estate services designed to meet all your property needs.
              From management to investment, our expert team is here to help at every step.
            </p>
          </div>
          
          {/* Services Tabs */}
          <div className="glass-morphism rounded-xl p-6 md:p-8 mb-16 animate-fade-in animation-delay-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`p-4 rounded-lg text-center transition-all duration-300 ${
                    activeTab === service.id
                      ? 'bg-primary text-white'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {service.icon}
                    <span className="text-sm font-medium">{service.title}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Active Service Content */}
            <div className="bg-white/5 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="glass-morphism rounded-xl p-6 text-center">
                    {activeService.icon}
                    <h3 className="text-xl font-semibold mb-3">{activeService.title}</h3>
                    <p className="text-white/70">{activeService.description}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeService.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-3 glass-morphism rounded-lg">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3 h-3 text-white"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-white/90">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Request This Service</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="glass-morphism rounded-xl overflow-hidden animate-fade-in animation-delay-300">
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">Ready to Get Started?</h2>
                  <p className="text-white/70 max-w-xl">
                    Contact our team today to discuss how we can help you with your specific property needs.
                    We're here to provide expert guidance every step of the way.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button size="lg" className="whitespace-nowrap">
                    <Key className="mr-2 h-4 w-4" />
                    Contact Us Now
                  </Button>
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

export default Services;
