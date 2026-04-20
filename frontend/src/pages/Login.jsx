import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    const result = await login(data.username, data.password);
    
    if (result.success) {
      navigate('/contact');
    } else {
      setError(result.message);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to send us a message
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
            >
              <FiAlertCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" />
                <input
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters' }
                  })}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" />
                <input
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Signup Link */}
          <Link
            to="/signup"
            className="w-full block text-center py-3 border border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
          >
            Create New Account
          </Link>
        </motion.div>

        {/* Footer Link */}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
