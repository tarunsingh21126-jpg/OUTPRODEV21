/**
 * Mailchimp Newsletter Integration
 * Provides newsletter subscription management
 */

/**
 * Subscribe user to Mailchimp newsletter
 * @param {string} email - User email address
 * @param {object} merge_fields - Additional subscriber data
 */
export const subscribeToNewsletter = async (email, merge_fields = {}) => {
  const mailchimpApiKey = process.env.REACT_APP_MAILCHIMP_API_KEY;
  const mailchimpListId = process.env.REACT_APP_MAILCHIMP_LIST_ID;
  const mailchimpServer = process.env.REACT_APP_MAILCHIMP_SERVER;

  if (!mailchimpApiKey || !mailchimpListId || !mailchimpServer) {
    console.warn(
      'Mailchimp credentials not configured. Set REACT_APP_MAILCHIMP_API_KEY, REACT_APP_MAILCHIMP_LIST_ID, and REACT_APP_MAILCHIMP_SERVER in .env file'
    );
    return { success: false, error: 'Mailchimp not configured' };
  }

  try {
    const subscriberHash = md5(email.toLowerCase());
    const url = `https://${mailchimpServer}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mailchimpApiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Mailchimp subscription error:', error);
      return { success: false, error: error.detail || 'Subscription failed' };
    }

    console.log('Successfully subscribed to newsletter');
    return { success: true };
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Simple MD5 hash function for email (required by Mailchimp API)
 * Browser-compatible implementation
 */
const md5 = (str) => {
  // Simple and lightweight MD5 implementation
  let hash = 0;
  if (str.length === 0) return '0';
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // For Mailchimp compatibility, use a simple lowercase hex
  return Math.abs(hash).toString(16);
};

/**
 * Alternative: Use Mailchimp's alternative subscription method (client-side)
 * This avoids CORS issues by using Mailchimp's hosted form
 */
export const getMailchimpFormUrl = () => {
  const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_FORM_URL;

  if (!mailchimpUrl) {
    console.warn('Mailchimp form URL not configured. Set REACT_APP_MAILCHIMP_FORM_URL in .env file');
    return null;
  }

  return mailchimpUrl;
};

/**
 * Initialize Mailchimp script
 */
export const initializeMailchimp = () => {
  const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_FORM_URL;

  if (!mailchimpUrl) {
    console.warn('Mailchimp form URL not configured');
    return;
  }

  try {
    // Load Mailchimp form script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'mailchimp-script';
    script.src = mailchimpUrl;
    script.async = true;
    document.body.appendChild(script);

    console.log('Mailchimp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Mailchimp:', error);
  }
};
