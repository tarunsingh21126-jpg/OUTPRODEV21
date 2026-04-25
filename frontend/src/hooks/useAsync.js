/**
 * useAsync Hook
 * Handles async operations with loading, error, and data states
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export const useAsync = (asyncFunction, immediate = true, onError = null) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setData(null);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setData(response);
        setStatus('success');
        return response;
      } catch (err) {
        setError(err);
        setStatus('error');

        if (onError) {
          onError(err);
        }

        throw err;
      }
    },
    [asyncFunction, onError]
  );

  const executeRef = useRef(execute);

  useEffect(() => {
    executeRef.current = execute;
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      executeRef.current();
    }
  }, [immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  };
};

/**
 * useFetch Hook
 * Handles API fetches with error handling
 */

export const useFetch = (url, options = {}, dependencies = []) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (fetchUrl = url) => {
      if (!fetchUrl) {
        setStatus('idle');
        return;
      }

      setStatus('pending');
      setData(null);
      setError(null);

      try {
        const response = await fetch(fetchUrl, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP ${response.status}`
          );
        }

        const result = await response.json();
        setData(result);
        setStatus('success');
        return result;
      } catch (err) {
        setError(err);
        setStatus('error');
        throw err;
      }
    },
    [url, options]
  );

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    refetch: () => fetchData(),
  };
};

/**
 * useForm Hook with Error Handling
 * Handles form state and validation
 */

export const useForm = (initialValues, onSubmit, onError = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);

        if (err.fieldErrors && typeof err.fieldErrors === 'object') {
          setErrors(err.fieldErrors);
        } else {
          setErrors({ submit: err.message || 'Submission failed' });
        }

        if (onError) {
          onError(err);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, onError]
  );

  const setFieldError = useCallback((name, message) => {
    setErrors(prev => ({
      ...prev,
      [name]: message,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    setValues,
    resetForm,
    getFieldProps: (name) => ({
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
    }),
  };
};

export default useAsync;
