// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AnalyticsProvider from './components/Analytics/AnalyticsProvider';
import OptionalIntegrationsProvider from './components/Analytics/OptionalIntegrationsProvider';
// import ServicesPage from './pages/ServicePage';
// import ServiceDetailPage from './pages/ServiceDetailPage';
import Navbar from './components/Navbar';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Outpro India</h1>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <OptionalIntegrationsProvider>

          <Router>
            <AnalyticsProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:slug" element={<ServiceDetail />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/contact"
                      element={
                        <ProtectedRoute>
                          <Contact />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </AnalyticsProvider>
          </Router>

        </OptionalIntegrationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;