import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden md:block bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">R</div>
              <div>
                <h3 className="font-bold text-lg text-white">Rupesh Store</h3>
                <p className="text-xs text-gray-400">Electronics & Fashion</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">Your one-stop shop for affordable electronics and fashion. Quality products at the best prices.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors text-sm">📸</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors text-sm">📘</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors text-sm">🐦</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors text-sm">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/Electronics" className="hover:text-primary-400 transition-colors">Electronics</Link></li>
              <li><Link to="/category/Fashion" className="hover:text-primary-400 transition-colors">Fashion</Link></li>
              <li><Link to="/flash-sale" className="hover:text-primary-400 transition-colors">Flash Sale</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-primary-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/trending" className="hover:text-primary-400 transition-colors">Trending</Link></li>
              <li><Link to="/orders" className="hover:text-primary-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary-400" />
                <span>Manish Market, Four Bungalow, Andheri West, Mumbai – 400058</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-primary-400" />
                <a href="mailto:ry728309@gmail.com" className="hover:text-primary-400">ry728309@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-primary-400" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-white mb-2">We Accept</h5>
              <div className="flex gap-2 text-lg">
                💳 🏧 📱 💵
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 Rupesh Store. All rights reserved. Built with ❤️ by Rupesh Yadav</p>
        </div>
      </div>
    </footer>
  );
}
