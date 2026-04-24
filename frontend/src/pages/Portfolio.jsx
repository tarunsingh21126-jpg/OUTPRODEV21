// pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import Skeleton from '../components/Skeleton';
import ProjectDetail from './ProjectDetail';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  // Get base URL for image paths (remove /api from the end)
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return 'https://via.placeholder.com/600x400?text=Project+Image';
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the base API URL (without /api)
    const baseUrl = process.env.REACT_APP_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from:', `${process.env.REACT_APP_API_URL}/projects`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
        console.log('Projects response:', response.data);
        setProjects(response.data.projects || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      <Hero
        title="Our Portfolio"
        subtitle="Explore our collection of award-winning projects and successful case studies."
      />

      {/* Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  filter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} height={64} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Make sure the backend server is running and database is seeded with project data.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden cursor-pointer"
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.shortDescription}</p>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                        View Case Study →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
