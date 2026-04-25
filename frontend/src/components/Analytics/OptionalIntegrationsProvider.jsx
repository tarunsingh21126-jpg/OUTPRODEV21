/**
 * Optional Integrations Provider
 * Initializes HubSpot, Tawk.to, and Mailchimp based on environment variables
 */

import React, { useEffect } from 'react';
import { initializeHubSpot } from '../../utils/integrations/hubspot';
import { initializeTawkTo } from '../../utils/integrations/tawkto';
import { initializeMailchimp } from '../../utils/integrations/mailchimp';

export const OptionalIntegrationsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize optional integrations
    if (process.env.REACT_APP_HUBSPOT_ID) {
      initializeHubSpot();
    }

    if (process.env.REACT_APP_TAWK_PROPERTY_ID && process.env.REACT_APP_TAWK_WIDGET_ID) {
      initializeTawkTo();
    }

    if (process.env.REACT_APP_MAILCHIMP_FORM_URL) {
      initializeMailchimp();
    }
  }, []);

  return <>{children}</>;
};

export default OptionalIntegrationsProvider;
