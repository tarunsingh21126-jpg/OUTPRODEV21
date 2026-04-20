// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = ({ 
  title = "Transforming Businesses with Digital Excellence", 
  subtitle = "Outpro India delivers cutting-edge digital solutions that drive growth, innovation, and success for modern enterprises.",
  ctaPrimary = "Get Started",
  ctaSecondary = "View Work"
}) => {
  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-block bg-primary-100 dark:bg-primary-900/20 px-6 py-3 rounded-full text-primary-700 dark:text-primary-300 font-medium">
            🚀 Award Winning Agency
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>{ctaPrimary}</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              {ctaSecondary}
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image/Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 animate-pulse"></div>
            <div className="absolute top-12 right-12 w-24 h-24 bg-white/20 rounded-2xl animate-bounce"></div>
            <div className="absolute bottom-12 left-12 w-32 h-32 bg-white/10 rounded-3xl blur-xl animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-white/30 to-transparent rounded-2xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;