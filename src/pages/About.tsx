import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  History, 
  Target, 
  Award,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      bio: 'With over 15 years in luxury real estate, Sarah founded LuxEstate with a vision to revolutionize the property market through innovation and exceptional service.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bio: 'Michael oversees all operations, ensuring that LuxEstate delivers consistent, high-quality service across all markets and property types.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Property Acquisitions',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
      bio: 'Elena leads our property acquisition team, with a keen eye for identifying high-potential properties and negotiating favorable terms for our clients.'
    },
    {
      name: 'James Wilson',
      role: 'Chief Marketing Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      bio: 'James brings his creative genius to LuxEstate\'s marketing strategies, ensuring our properties receive maximum exposure to the right audience.'
    }
  ];

  const milestones = [
    {
      year: 2010,
      title: 'Company Founded',
      description: 'LuxEstate was established with a mission to transform the luxury real estate experience.',
    },
    {
      year: 2013,
      title: 'Expansion to 10 Cities',
      description: 'We expanded our operations to cover 10 major cities across the country.',
    },
    {
      year: 2015,
      title: 'Launch of Investment Division',
      description: 'Launched our specialized division focusing on real estate investments and portfolio management.',
    },
    {
      year: 2018,
      title: 'International Expansion',
      description: 'Began our international operations with offices in London, Dubai, and Singapore.',
    },
    {
      year: 2020,
      title: 'Digital Transformation',
      description: 'Implemented cutting-edge technology for virtual property tours and digital transactions.',
    },
    {
      year: 2023,
      title: 'Sustainability Initiative',
      description: 'Launched our eco-friendly property development division focused on sustainable living.',
    }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and ethics in all our dealings.',
      icon: <CheckCircle className="w-10 h-10 text-primary" />
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service and operations.',
      icon: <Award className="w-10 h-10 text-primary" />
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge solutions for our clients.',
      icon: <Target className="w-10 h-10 text-primary" />
    },
    {
      title: 'Client-Centric',
      description: 'Our clients' needs and satisfaction are at the center of everything we do.',
      icon: <Users className="w-10 h-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="glass-morphism rounded-xl overflow-hidden mb-16 animate-fade-in">
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">About LuxEstate</h1>
                <p className="text-white/70 mb-6">
                  Founded in 2010, LuxEstate has grown to become a leading name in the luxury real estate market.
                  We combine deep industry expertise with innovative approaches to deliver exceptional results for our clients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="glass-morphism rounded-lg p-4 flex items-center">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">13+</div>
                      <div className="text-sm text-white/70">Years Experience</div>
                    </div>
                  </div>
                  <div className="glass-morphism rounded-lg p-4 flex items-center">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">50+</div>
                      <div className="text-sm text-white/70">Team Members</div>
                    </div>
                  </div>
                  <div className="glass-morphism rounded-lg p-4 flex items-center">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">15k+</div>
                      <div className="text-sm text-white/70">Properties Sold</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 perspective-container">
                <div className="property-card-3d glass-morphism rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="LuxEstate Office" 
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <Tabs defaultValue="team" className="mb-16 animate-fade-in animation-delay-100">
            <TabsList className="w-full glass-morphism mb-8">
              <TabsTrigger value="team" className="flex-1">Our Team</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Our History</TabsTrigger>
              <TabsTrigger value="values" className="flex-1">Our Values</TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="mt-0">
              <div className="glass-morphism rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Leadership Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="glass-morphism rounded-xl overflow-hidden transition-transform hover:scale-105">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-primary text-sm mb-2">{member.role}</p>
                        <p className="text-white/70 text-sm">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button>View Full Team</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="glass-morphism rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Our Journey Through Time</h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <div 
                        key={index} 
                        className={`relative flex flex-col md:flex-row gap-6 ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        {/* Timeline Point */}
                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-black"></div>
                        
                        {/* Content */}
                        <div className="md:w-1/2"></div>
                        <div className="pl-8 md:pl-0 md:w-1/2">
                          <div className="glass-morphism rounded-xl p-4">
                            <div className="text-primary font-semibold mb-1">{milestone.year}</div>
                            <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                            <p className="text-white/70">{milestone.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="values" className="mt-0">
              <div className="glass-morphism rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="glass-morphism rounded-xl p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-white/70">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 glass-morphism rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-center">Our Mission</h3>
                  <p className="text-center text-white/90 italic">
                    "To revolutionize the real estate experience by providing exceptional service, 
                    innovative solutions, and creating lasting value for our clients and communities."
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Call to Action */}
          <div className="glass-morphism rounded-xl overflow-hidden animate-fade-in animation-delay-200">
            <div className="relative p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Journey</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-6">
                  Whether you&apos;re looking to buy, sell, or invest in properties, our team is ready to provide
                  you with expert guidance and support throughout your real estate journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>Contact Us</Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">
                    View Properties
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

export default About;
