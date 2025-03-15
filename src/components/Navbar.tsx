
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building, InfoIcon, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Properties', path: '/properties', icon: <Building className="h-4 w-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <InfoIcon className="h-4 w-4 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center">
          <span className="font-display text-2xl font-semibold tracking-tight text-gradient">LuxEstate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center text-sm font-medium transition-colors hover:text-white/90 ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-white/70'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center text-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-white/70'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Button className="mt-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
