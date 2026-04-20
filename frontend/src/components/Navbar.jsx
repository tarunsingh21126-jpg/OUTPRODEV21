import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiLogIn } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-3">
            {/* Logo - Responsive sizing */}
            <Link 
              to="/" 
              className="text-xl sm:text-2xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent whitespace-nowrap"
            >
              Outpro
              <span className="hidden sm:inline"> India</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative group px-2 py-2 text-sm xl:text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-2 h-0.5 bg-primary-600 group-hover:w-[calc(100%-1rem)] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-[calc(100%-1rem)]' : 'w-0'
                  }`} />
                </Link>
              ))}
              
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>

              {/* Auth buttons */}
              {user ? (
                <div className="flex items-center space-x-4 border-l border-gray-300 dark:border-gray-600 pl-4 ml-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 border-l border-gray-300 dark:border-gray-600 pl-4 ml-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center space-x-2"
                  >
                    <FiLogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Tablet/Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex flex-col space-y-1 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 text-base font-medium transition-all rounded-lg ${
                        location.pathname === link.path
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Mobile auth buttons */}
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                    {user ? (
                      <div className="flex flex-col space-y-3">
                        <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          Logged in as: <span className="text-primary-600 dark:text-primary-400">{user.username}</span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium"
                        >
                          <FiLogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col space-x-0 space-y-2">
                        <Link
                          to="/login"
                          className="w-full px-4 py-3 text-center text-sm font-medium border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="w-full px-4 py-3 text-center text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile menu backdrop/overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;