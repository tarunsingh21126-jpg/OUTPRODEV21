// pages/About.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Hero from '../components/Hero';
import Skeleton from '../components/Skeleton';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/team?featured=true`);
        setTeam(response.data.members);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div>
      <Hero
        title="About Outpro India"
        subtitle="We are a team of passionate digital innovators dedicated to transforming businesses through cutting-edge technology and creative solutions."
      />

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Our Mission',
                description: 'To empower businesses with innovative digital solutions that drive growth, efficiency, and market leadership in the digital age.',
                icon: '🎯'
              },
              {
                title: 'Our Vision',
                description: 'To be the most trusted and innovative digital transformation partner for enterprises seeking excellence and sustainable growth.',
                icon: '🚀'
              },
              {
                title: 'Our Values',
                description: 'Excellence, innovation, integrity, and client success drive everything we do. We believe in long-term partnerships built on trust.',
                icon: '💎'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2015, Outpro India has been at the forefront of digital transformation. What started as a small team of passionate developers has grown into a full-service digital agency serving clients across India and globally.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Over the years, we've helped hundreds of businesses digitize their operations, improve customer experiences, and achieve remarkable growth. Our commitment to excellence, continuous innovation, and client success remains unwavering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Meet the brilliant minds behind our success</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mb-4 overflow-hidden rounded-lg h-64">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
