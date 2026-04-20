// components/ServiceCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group h-full"
    >
      <Link to={`/services/${service.slug}`} className="block h-full">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-gray-700/50 hover:border-primary-200/50 hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">{service.icon || '🚀'}</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-gray-900 dark:text-white">
            {service.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {service.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Learn More
            </span>
            <FiArrowRight className="text-primary-600 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;