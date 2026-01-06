
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Car size={24} className="text-blue-500" />
              <span className="text-2xl font-bold font-lexend">GlossMobile</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Premium mobile detailing service brought directly to your driveway. We specialize in showroom-quality results using professional techniques and eco-friendly products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-blue-400">Services & Pricing</Link></li>
              <li><Link to="/booking" className="hover:text-blue-400">Book Online</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400">Before & After</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-500" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-500" />
                <span>hello@glossmobile.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-500" />
                <span>Los Angeles & Surrounding Areas</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-white">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white">9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white text-blue-400">By Appointment</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-xs opacity-60">
          <p>© {new Date().getFullYear()} GlossMobile Detailing. All rights reserved. Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
