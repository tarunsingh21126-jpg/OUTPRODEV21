// components/Stats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Stats = ({ stats = {} }) => {
  const defaultStats = [
    { label: 'Happy Clients', value: 127 },
    { label: 'Projects Completed', value: 450 },
    { label: 'Awards Won', value: 23 },
    { label: 'Years in Business', value: 8 }
  ];

  const statsData = stats.clients ? [
    { label: 'Happy Clients', value: stats.clients },
    { label: 'Projects Completed', value: stats.projects },
    { label: 'Awards Won', value: stats.awards },
    { label: 'Years in Business', value: stats.years }
  ] : defaultStats;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <div className="text-3xl md:text-5xl font-bold mb-2">
                <CountUp end={stat.value} duration={2.5} suffix="+" />
              </div>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
