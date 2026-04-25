/**
 * Tawk.to Live Chat Integration
 * Provides live chat widget initialization
 */

/**
 * Initialize Tawk.to live chat widget
 */
export const initializeTawkTo = () => {
  const tawkPropertyId = process.env.REACT_APP_TAWK_PROPERTY_ID;
  const tawkWidgetId = process.env.REACT_APP_TAWK_WIDGET_ID;

  if (!tawkPropertyId || !tawkWidgetId) {
    console.warn(
      'Tawk.to credentials not configured. Set REACT_APP_TAWK_PROPERTY_ID and REACT_APP_TAWK_WIDGET_ID in .env file'
    );
    return;
  }

  if (window.Tawk_API) {
    console.log('Tawk.to already loaded');
    return;
  }

  try {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    console.log('Tawk.to initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Tawk.to:', error);
  }
};

/**
 * Set Tawk.to visitor properties
 */
export const setTawkVisitorInfo = (visitorData) => {
  if (!window.Tawk_API) {
    console.warn('Tawk.to not loaded');
    return;
  }

  try {
    window.Tawk_API.setAttributes(visitorData, (error) => {
      if (error) {
        console.error('Failed to set Tawk.to visitor info:', error);
      }
    });
  } catch (error) {
    console.error('Failed to set Tawk.to visitor info:', error);
  }
};

/**
 * Show/Hide Tawk.to widget
 */
export const toggleTawkWidget = (show = true) => {
  if (!window.Tawk_API) {
    console.warn('Tawk.to not loaded');
    return;
  }

  try {
    if (show) {
      window.Tawk_API.showWidget();
    } else {
      window.Tawk_API.hideWidget();
    }
  } catch (error) {
    console.error('Failed to toggle Tawk.to widget:', error);
  }
};

/**
 * Maximize Tawk.to widget
 */
export const maximizeTawkWidget = () => {
  if (!window.Tawk_API) {
    console.warn('Tawk.to not loaded');
    return;
  }

  try {
    window.Tawk_API.maximize();
  } catch (error) {
    console.error('Failed to maximize Tawk.to widget:', error);
  }
};
