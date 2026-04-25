/**
 * HubSpot Integration Utility
 * Provides tracking and form management for HubSpot CRM
 */

/**
 * Initialize HubSpot tracking
 */
export const initializeHubSpot = () => {
  const hubspotId = process.env.REACT_APP_HUBSPOT_ID;

  if (!hubspotId) {
    console.warn('HubSpot ID not configured. Set REACT_APP_HUBSPOT_ID in .env file');
    return;
  }

  if (window.hbspt) {
    console.log('HubSpot already loaded');
    return;
  }

  try {
    // Load HubSpot tracking script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.src = `//js.hs-scripts.com/${hubspotId}.js`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    console.log('HubSpot initialized successfully');
  } catch (error) {
    console.error('Failed to initialize HubSpot:', error);
  }
};

/**
 * Track HubSpot form submission
 */
export const trackHubSpotForm = (formData) => {
  if (!window.hbspt) {
    console.warn('HubSpot not loaded');
    return;
  }

  try {
    window.hbspt.forms.submit(formData);
  } catch (error) {
    console.error('Failed to submit HubSpot form:', error);
  }
};

/**
 * Set HubSpot contact properties
 */
export const setHubSpotContactProperties = (properties) => {
  if (!window.hbspt) {
    console.warn('HubSpot not loaded');
    return;
  }

  try {
    // Store in localStorage for later use
    localStorage.setItem('hubspotContact', JSON.stringify(properties));
  } catch (error) {
    console.error('Failed to set HubSpot contact properties:', error);
  }
};
