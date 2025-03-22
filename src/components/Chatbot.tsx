
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { getProperties } = useFirebase();
  const { toast } = useToast();

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

    // Start preparing the bot response
    const lowerCaseText = text.toLowerCase();
    let botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      sender: 'bot',
    };

    // Check if the message is about property recommendations
    if (
      lowerCaseText.includes('suggest') || 
      lowerCaseText.includes('recommend') ||
      lowerCaseText.includes('good property') ||
      lowerCaseText.includes('good land') ||
      lowerCaseText.includes('show me property') ||
      lowerCaseText.includes('find property')
    ) {
      try {
        // Get properties based on any filters detected in the message
        const filters: any = {};
        
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
          botResponse = {
            id: (Date.now() + 1).toString(),
            text: `Here are some properties you might be interested in:`,
            sender: 'bot',
            properties: transformedProperties.slice(0, 3) // Limit to 3 properties
          };
        } else {
          botResponse = {
            id: (Date.now() + 1).toString(),
            text: `I couldn't find any properties matching your criteria. Would you like to try a different search?`,
            sender: 'bot',
          };
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: `I'm sorry, I encountered an error while searching for properties. Please try again later.`,
          sender: 'bot',
        };
      }
    } else if (lowerCaseText.includes('price') || lowerCaseText.includes('cost')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Our properties range from $200,000 to $5,000,000 depending on location, size, and amenities. You can use our search filters on the Properties page to find options within your budget.`,
        sender: 'bot',
      };
    } else if (lowerCaseText.includes('location') || lowerCaseText.includes('where')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `We have properties in various premium locations across the country. You can view all available locations on our Properties page.`,
        sender: 'bot',
      };
    } else if (lowerCaseText.includes('contact') || lowerCaseText.includes('speak')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `You can contact our team via the Contact page or call us at (555) 123-4567. Our agents are available Monday to Friday from 9 AM to 6 PM.`,
        sender: 'bot',
      };
    } else if (lowerCaseText.includes('hello') || lowerCaseText.includes('hi')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Hello! How can I assist you with your real estate inquiries today?`,
        sender: 'bot',
      };
    } else {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `I'm not sure I understand. Are you looking for property recommendations, pricing information, or something else? Feel free to ask about our properties, locations, or services.`,
        sender: 'bot',
      };
    }

    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
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
            />
            <Button 
              size="icon"
              onClick={toggleListening}
              variant="ghost"
              className="text-white hover:bg-gray-700"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Button
              onClick={() => handleSend()}
              className="bg-indigo-600 hover:bg-indigo-700"
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
