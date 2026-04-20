// components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/testimonials?featured=true&limit=6`);
      setTestimonials(response.data.testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Trusted by leading companies worldwide
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg"
        >
          {/* Stars */}
          <div className="flex justify-center mb-6">
            {[...Array(current.rating || 5)].map((_, i) => (
              <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={20} />
            ))}
          </div>

          {/* Quote */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mb-8 italic leading-relaxed">
            "{current.content}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
              <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{current.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {current.position} at {current.company}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={handlePrev}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition-colors duration-300"
          >
            <FiChevronLeft size={24} />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition-colors duration-300"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
