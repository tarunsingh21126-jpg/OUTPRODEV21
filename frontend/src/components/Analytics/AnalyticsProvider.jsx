/**
 * Analytics Provider Component
 * Initializes GA4 and tracks page views
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeGA4, trackPageView } from '../../utils/analytics';

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  // Initialize GA4 on mount
  useEffect(() => {
    initializeGA4();
  }, []);

  // Track page view on route change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return <>{children}</>;
};

export default AnalyticsProvider;
