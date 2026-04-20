// pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import Skeleton from '../components/Skeleton';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${slug}`);
        setProject(response.data);
      } catch (err) {
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <Skeleton type="detail" />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!project) return <div className="text-center py-20">Project not found</div>;

  return (
    <div>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <Link to="/portfolio" className="flex items-center text-primary-600 hover:text-primary-700 mb-8">
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={project.image}
            alt={project.title}
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase mb-2">
                Client
              </h3>
              <p className="text-xl text-gray-900 dark:text-white">{project.client || 'Premium Client'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase mb-2">
                Category
              </h3>
              <p className="text-xl text-gray-900 dark:text-white">{project.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase mb-2">
                Year
              </h3>
              <p className="text-xl text-gray-900 dark:text-white">
                {new Date(project.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* KPI Results */}
          {project.kpiResults && project.kpiResults.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Results & KPIs</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {project.kpiResults.map((kpi, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{kpi.metric}</p>
                    <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {kpi.value}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{kpi.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Interested in This Project?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Let's discuss how we can create similar success for your business.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
