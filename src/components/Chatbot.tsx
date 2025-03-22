
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip } from '@/components/ui/tooltip';
import { useFirebase } from '@/contexts/FirebaseContext';
import { Property } from '@/types';
import PropertyCard from './PropertyCard';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  properties?: Property[];
  isTyping?: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your real estate assistant. How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { getProperties } = useFirebase();
  const { toast } = useToast();
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // For speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Error",
          description: "There was a problem with the voice recognition. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const simulateTyping = (text: string, properties?: Property[]) => {
    // Add a typing indicator message
    const typingId = Date.now().toString();
    setIsTyping(true);
    setMessages(prev => [...prev, { 
      id: typingId,
      text: '...',
      sender: 'bot',
      isTyping: true
    }]);
    
    // Calculate a dynamic typing duration based on message length
    const wordCount = text.split(' ').length;
    const typingDuration = Math.min(Math.max(wordCount * 50, 500), 2000); // Between 500ms and 2000ms
    
    // Remove the typing indicator and add the actual message after the delay
    typingTimerRef.current = setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== typingId));
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(),
        text,
        sender: 'bot',
        properties
      }]);
      setIsTyping(false);
    }, typingDuration);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Process the query
    const lowerCaseText = text.toLowerCase();
    
    // Property-related queries
    if (
      lowerCaseText.includes('property') || 
      lowerCaseText.includes('land') || 
      lowerCaseText.includes('house') || 
      lowerCaseText.includes('apartment') ||
      lowerCaseText.includes('recommend') ||
      lowerCaseText.includes('suggest') ||
      lowerCaseText.includes('show me')
    ) {
      try {
        // Extract filters from the message
        const filters: any = {};
        
        // Property type filter
        if (lowerCaseText.includes('house')) {
          filters.propertyType = 'House';
        } else if (lowerCaseText.includes('apartment')) {
          filters.propertyType = 'Apartment';
        } else if (lowerCaseText.includes('land')) {
          filters.propertyType = 'Land';
        }

        // Location filter
        const locationMatch = text.match(/in\s+([a-zA-Z\s]+)/i);
        if (locationMatch && locationMatch[1]) {
          filters.location = locationMatch[1].trim();
        }

        // Price range filter
        const priceMatch = text.match(/under\s+\$?(\d+[k|K|m|M]?)/);
        if (priceMatch && priceMatch[1]) {
          let price = priceMatch[1];
          if (price.toLowerCase().endsWith('k')) {
            price = String(parseFloat(price) * 1000);
          } else if (price.toLowerCase().endsWith('m')) {
            price = String(parseFloat(price) * 1000000);
          }
          filters.maxPrice = price;
        }

        const properties = await getProperties(filters);
        const transformedProperties: Property[] = properties.map(p => ({
          id: p.id,
          title: p.name,
          description: p.description,
          price: parseInt(p.price),
          images: p.image_urls,
          beds: 3, // Default values
          baths: 2,
          area: 1500,
          location: {
            address: "Sample Address",
            city: "Sample City",
            state: "Sample State",
            zip: "12345",
            coordinates: {
              lat: p.location.latitude,
              lng: p.location.longitude
            }
          },
          status: 'For Sale',
          propertyType: 'Land',
          yearBuilt: 2022,
          features: ['Sample Feature 1', 'Sample Feature 2'],
        }));

        if (properties.length > 0) {
          // Create natural language response based on the query and filter results
          let responseText = '';
          
          // Check what kind of properties were requested
          if (filters.propertyType) {
            responseText = `I found ${properties.length} ${filters.propertyType.toLowerCase()} properties that might interest you! `;
          } else {
            responseText = `I found ${properties.length} properties that might match what you're looking for! `;
          }
          
          // Add location information if specified
          if (filters.location) {
            responseText += `They're located in ${filters.location} as requested. `;
          }
          
          // Add price information if specified
          if (filters.maxPrice) {
            responseText += `All within your budget of $${parseInt(filters.maxPrice).toLocaleString()}. `;
          }
          
          responseText += `Here are some options I think you'll love:`;
          
          simulateTyping(responseText, transformedProperties.slice(0, 3));
        } else {
          let noResultsText = "I couldn't find any properties that match exactly what you're looking for. ";
          
          if (Object.keys(filters).length > 0) {
            noResultsText += "Would you like to try a broader search? Perhaps with a different location or price range?";
          } else {
            noResultsText += "Could you provide more details about what you're looking for, such as location, price range, or property type?";
          }
          
          simulateTyping(noResultsText);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        simulateTyping("I apologize, but I encountered an issue while searching for properties. Could we try again in a moment?");
      }
    } 
    // Price inquiries
    else if (lowerCaseText.includes('price') || lowerCaseText.includes('cost') || lowerCaseText.includes('expensive')) {
      simulateTyping("Our properties range from $200,000 for starter homes to $5,000,000 for luxury estates. The price varies based on location, size, and amenities. What's your budget range? I'd be happy to find properties that fit within it.");
    } 
    // Location inquiries
    else if (lowerCaseText.includes('location') || lowerCaseText.includes('where') || lowerCaseText.includes('area')) {
      simulateTyping("We have properties in various premium locations across the country, including beachfront properties, urban apartments, and countryside estates. Is there a particular area you're interested in exploring?");
    } 
    // Contact inquiries
    else if (lowerCaseText.includes('contact') || lowerCaseText.includes('speak') || lowerCaseText.includes('agent') || lowerCaseText.includes('call')) {
      simulateTyping("You can reach our team at (555) 123-4567 or visit our Contact page. Our agents are available Monday to Friday from 9 AM to 6 PM. Would you like me to help schedule a call with one of our agents?");
    } 
    // Greetings
    else if (lowerCaseText.includes('hello') || lowerCaseText.includes('hi') || lowerCaseText.match(/^hey/)) {
      simulateTyping("Hi there! I'm your personal real estate assistant. I can help you find properties, answer questions about pricing or locations, or connect you with our team. What can I assist you with today?");
    }
    // Default response for other queries
    else {
      simulateTyping("I'd be happy to help with your real estate needs. Are you looking for property recommendations, information about pricing, or details about specific locations? Feel free to ask anything about our properties and services.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="shadow-lg w-80 sm:w-96 h-96 flex flex-col rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-3 flex items-center justify-between text-white">
            <h3 className="font-semibold">Real Estate Assistant</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={toggleListening}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={toggleChat}
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-950 to-gray-900"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-white/90'
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex space-x-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '300ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '600ms' }}></span>
                    </div>
                  ) : (
                    <>
                      <p>{message.text}</p>
                      {message.properties && message.properties.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {message.properties.map((property) => (
                            <div key={property.id} className="rounded-lg overflow-hidden bg-gray-700 p-2">
                              <PropertyCard property={property} index={0} />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            {isListening && (
              <div className="text-center text-white/70 py-2">
                Listening... Speak now
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-800 flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 bg-gray-700 border-gray-700 text-white placeholder-gray-400"
              disabled={isTyping}
            />
            <Button 
              size="icon"
              onClick={toggleListening}
              variant="ghost"
              className="text-white hover:bg-gray-700"
              disabled={isTyping}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Button
              onClick={() => handleSend()}
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={isTyping || !inputValue.trim()}
            >
              Send
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
