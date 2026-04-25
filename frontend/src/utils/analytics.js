/**
 * Analytics Utility Module
 * Handles Google Analytics 4 tracking and event management
 */

import ReactGA from 'react-ga4';

const GA4_ID = process.env.REACT_APP_GA4_ID;

/**
 * Initialize Google Analytics 4
 */
export const initializeGA4 = () => {
  if (!GA4_ID) {
    console.warn('GA4 ID not configured. Set REACT_APP_GA4_ID in .env file');
    return;
  }

  try {
    ReactGA.initialize(GA4_ID);
    console.log('Google Analytics 4 initialized successfully');
  } catch (error) {
    console.error('Failed to initialize GA4:', error);
  }
};

/**
 * Track page view
 * Automatically called on route change
 */
export const trackPageView = (path) => {
  if (!GA4_ID) return;

  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Track custom events
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} label - Event label (optional)
 * @param {number} value - Event value (optional)
 */
export const trackEvent = (category, action, label = '', value = null) => {
  if (!GA4_ID) return;

  try {
    const eventData = {
      category,
      action,
    };

    if (label) eventData.label = label;
    if (value !== null) eventData.value = value;

    ReactGA.event(eventData);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form', 'submit', formName);
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName) => {
  trackEvent('button', 'click', buttonName);
};

/**
 * Track CTA conversions
 */
export const trackConversion = (conversionType) => {
  trackEvent('conversion', conversionType);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth) => {
  trackEvent('scroll', 'depth', `${depth}%`, depth);
};

/**
 * Track video engagement
 */
export const trackVideoEngagement = (videoTitle, action) => {
  trackEvent('video', action, videoTitle);
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url) => {
  trackEvent('external_link', 'click', url);
};

/**
 * Track user interaction with portfolio/services
 */
export const trackPortfolioInteraction = (projectName, action) => {
  trackEvent('portfolio', action, projectName);
};

/**
 * Track service detail views
 */
export const trackServiceView = (serviceName) => {
  trackEvent('service', 'view', serviceName);
};

/**
 * Track team member views
 */
export const trackTeamView = (memberName) => {
  trackEvent('team', 'view', memberName);
};

/**
 * Track testimonial engagement
 */
export const trackTestimonialView = (clientName) => {
  trackEvent('testimonial', 'view', clientName);
};
