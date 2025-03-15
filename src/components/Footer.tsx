
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full glass-morphism mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-semibold tracking-tight text-gradient">LuxEstate</span>
            </Link>
            <p className="text-sm text-white/70 max-w-xs">
              Luxurious properties for discerning clients. Discover your dream home with our exclusive listings.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider text-white/90 uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-white/70 hover:text-white text-sm transition-colors">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider text-white/90 uppercase">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Buying Guide</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Investment Tips</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Property Management</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Market Insights</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider text-white/90 uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-white/60 mt-0.5 mr-3 shrink-0" />
                <span className="text-white/70 text-sm">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-white/60 mr-3 shrink-0" />
                <span className="text-white/70 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-white/60 mr-3 shrink-0" />
                <span className="text-white/70 text-sm">info@luxestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} LuxEstate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/80 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
