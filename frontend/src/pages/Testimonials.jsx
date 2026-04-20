// pages/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiStar, FiTrendingUp, FiAward, FiTarget, FiMessageCircle, FiThumbsUp } from 'react-icons/fi';
import Hero from '../components/Hero';
import Skeleton from '../components/Skeleton';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/testimonials`);
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Success stories data
  const successStories = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Student → Full Stack Developer',
      company: 'Tech Startup',
      achievement: 'Got Hired as Full Stack Developer',
      stats: [
        { label: 'Salary Increase', value: '₹8 LPA' },
        { label: 'Skills Learned', value: '15+' },
        { label: 'Projects Built', value: '8' }
      ],
      description: 'Transformed from a college student with basic knowledge to a confident full-stack developer. Got hired within 3 months of completing the course.',
      icon: FiTrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10'
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      role: 'Entrepreneur',
      company: 'E-commerce Business',
      achievement: 'Scaled Revenue by 250%',
      stats: [
        { label: 'Revenue Growth', value: '250%' },
        { label: 'Team Size', value: '12+' },
        { label: 'Customers', value: '5000+' }
      ],
      description: 'Used Outpro\'s web development and digital marketing services to revamp his e-commerce store and triple his sales in 8 months.',
      icon: FiAward,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/10'
    },
    {
      id: 3,
      name: 'Aisha Khan',
      role: 'Marketing Professional',
      company: 'Digital Marketing Agency',
      achievement: 'Launched Personal Brand Successfully',
      stats: [
        { label: 'Instagram Followers', value: '50K' },
        { label: 'Avg. Engagement', value: '8.5%' },
        { label: 'Clients Acquired', value: '20+' }
      ],
      description: 'Built a strong personal brand through our digital strategy course and now runs her own successful marketing consultancy.',
      icon: FiTarget,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10'
    },
    {
      id: 4,
      name: 'Vikram Patel',
      role: 'UI/UX Designer',
      company: 'Design Studio',
      achievement: 'Freelance Income ₹2 LPA',
      stats: [
        { label: 'Monthly Income', value: '₹15-20K' },
        { label: 'Active Projects', value: '8-10' },
        { label: 'Client Rating', value: '4.9/5' }
      ],
      description: 'Transitioned from graphic design to UI/UX design through our specialized program and now earns consistent six figures freelancing.',
      icon: FiAward,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/10'
    }
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      title: 'Founder & CEO',
      company: 'Digital Solutions Inc.',
      rating: 5,
      review: 'Outpro India has been instrumental in transforming our digital presence. Their team is professional, creative, and delivers exceptional results. Highly recommended!',
      helpful: 234,
      image: 'https://i.pravatar.cc/150?img=1',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/10'
    },
    {
      id: 2,
      name: 'Amit Verma',
      title: 'Business Manager',
      company: 'StartUp Ventures',
      rating: 5,
      review: 'The web development services exceeded our expectations. The team understood our vision perfectly and delivered a stunning website that boosted our conversions by 40%.',
      helpful: 189,
      image: 'https://i.pravatar.cc/150?img=2',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/10'
    },
    {
      id: 3,
      name: 'Neha Desai',
      title: 'Marketing Director',
      company: 'Tech Innovation Group',
      rating: 5,
      review: 'Outstanding digital marketing strategy! The team\'s data-driven approach helped us reach 10x more customers in just 6 months. Great partnership!',
      helpful: 267,
      image: 'https://i.pravatar.cc/150?img=3',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
    },
    {
      id: 4,
      name: 'Rohan Singh',
      title: 'Product Lead',
      company: 'Cloud Systems',
      rating: 5,
      review: 'Working with Outpro India on our mobile app project was fantastic. The developers were skilled, responsive, and delivered on time with zero compromises on quality.',
      helpful: 156,
      image: 'https://i.pravatar.cc/150?img=4',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/10'
    },
    {
      id: 5,
      name: 'Divya Patel',
      title: 'Entrepreneur',
      company: 'Fashion E-commerce',
      rating: 5,
      review: 'Best investment for my business! Outpro redesigned our store and implemented a seamless checkout process. Our sales tripled within 3 months!',
      helpful: 312,
      image: 'https://i.pravatar.cc/150?img=5',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/10'
    },
    {
      id: 6,
      name: 'Karan Nair',
      title: 'Operations Head',
      company: 'Logistics Solutions',
      rating: 5,
      review: 'Fantastic support and implementation! The custom software solution delivered by Outpro streamlined our operations and reduced costs significantly. Very impressed!',
      helpful: 198,
      image: 'https://i.pravatar.cc/150?img=6',
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50 dark:bg-violet-900/10'
    }
  ];

  return (
    <div>
      <Hero
        title="Client Testimonials"
        subtitle="Hear from our satisfied clients about their experience working with Outpro India."
      />

      {/* Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real transformations from our students and clients who achieved their goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${story.bgColor} backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}
                >
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {story.role}
                      </p>
                    </div>
                    <div className={`bg-gradient-to-br ${story.color} p-3 rounded-lg text-white`}>
                      <IconComponent size={28} />
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-600">
                    <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text mb-2">
                      {story.achievement}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {story.stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What our clients say about working with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((reviewItem, index) => (
              <motion.div
                key={reviewItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${reviewItem.bgColor} backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                {/* Header with stars */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex space-x-1 mb-2">
                      {[...Array(reviewItem.rating)].map((_, i) => (
                        <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                      ))}
                    </div>
                  </div>
                  <FiMessageCircle className={`text-transparent bg-gradient-to-br ${reviewItem.color} bg-clip-text`} size={24} />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                  "{reviewItem.review}"
                </p>

                {/* Author Info */}
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={reviewItem.image} 
                      alt={reviewItem.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                        {reviewItem.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {reviewItem.title} at {reviewItem.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Helpful Count */}
                <motion.div
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiThumbsUp size={16} />
                  <span>{reviewItem.helpful} found this helpful</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Client Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Trusted by leading companies and entrepreneurs
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} height={48} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Stars */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
