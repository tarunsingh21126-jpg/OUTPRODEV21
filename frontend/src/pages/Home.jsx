// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ServicesOverview from '../components/ServicesOverview';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import PortfolioGrid from '../components/PortfolioGrid';
import CTA from '../components/CTA';

const Home = () => {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    awards: 0,
    years: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats or use static data
    setTimeout(() => {
      setStats({
        clients: 127,
        projects: 450,
        awards: 23,
        years: 8
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Hero />
      
      {!loading && (
        <>
          <ServicesOverview />
          <Stats stats={stats} />
          <PortfolioGrid />
          <Testimonials />
          <CTA />
        </>
      )}
    </>
  );
};

export default Home;