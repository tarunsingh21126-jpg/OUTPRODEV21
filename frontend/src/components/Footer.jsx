// components/Footer.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">Outpro India</h3>
            <p className="text-gray-400 leading-relaxed">
              Delivering excellence in digital solutions and business transformation.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <FiMail className="text-primary-400" />
                <a href="mailto:info@outproindia.com" className="hover:text-primary-400 transition-colors">
                  info@outproindia.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-400" />
                <a href="tel:+911234567890" className="hover:text-primary-400 transition-colors">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-400 mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Outpro India. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
