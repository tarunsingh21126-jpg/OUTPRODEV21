/**
 * API Error Handling Utility
 * Provides centralized error handling for API calls
 */

export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Handle API errors
 * @param {Error|Response} error - Error object or fetch response
 * @returns {Object} Standardized error object
 */
export const handleAPIError = (error) => {
  console.error('API Error:', error);

  // Network error
  if (!error.status) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      status: null,
      data: null,
    };
  }

  // Timeout error
  if (error.name === 'AbortError') {
    return {
      type: 'timeout',
      message: 'Request timeout. Please try again.',
      status: null,
      data: null,
    };
  }

  // HTTP error
  if (error.status) {
    let message = 'An error occurred';

    switch (error.status) {
      case 400:
        message = error.data?.message || 'Bad request';
        break;
      case 401:
        message = 'Unauthorized. Please login again.';
        break;
      case 403:
        message = 'Forbidden. You do not have permission.';
        break;
      case 404:
        message = 'Resource not found.';
        break;
      case 409:
        message = error.data?.message || 'Resource already exists.';
        break;
      case 429:
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      case 503:
        message = 'Service unavailable. Please try again later.';
        break;
      default:
        message = error.message || `Error ${error.status}`;
    }

    return {
      type: 'http',
      message,
      status: error.status,
      data: error.data,
    };
  }

  // Unknown error
  return {
    type: 'unknown',
    message: error.message || 'An unexpected error occurred',
    status: null,
    data: null,
  };
};

/**
 * Fetch wrapper with error handling
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export const fetchWithErrorHandling = async (url, options = {}) => {
  const timeout = options.timeout || 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new APIError(
        data.message || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      error.message || 'Request failed',
      null,
      error
    );
  }
};

/**
 * Retry failed API call
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries in ms
 */
export const retryAsyncFunction = async (fn, retries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};

/**
 * Validate API response
 * @param {Object} data - Response data
 * @param {Array<string>} requiredFields - Required fields
 * @throws {Error} If validation fails
 */
export const validateResponse = (data, requiredFields = []) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return data;
};
