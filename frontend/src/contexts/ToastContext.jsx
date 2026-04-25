/**
 * Toast Context
 * Provides global toast notification management
 */

import React, { createContext, useContext, useCallback, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();

    setToasts(prev => [...prev, {
      id,
      message,
      type,
      duration,
    }]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showError = useCallback((message) => {
    return addToast(message, 'error');
  }, [addToast]);

  const showSuccess = useCallback((message) => {
    return addToast(message, 'success');
  }, [addToast]);

  const showWarning = useCallback((message) => {
    return addToast(message, 'warning');
  }, [addToast]);

  const showInfo = useCallback((message) => {
    return addToast(message, 'info');
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
};

export default ToastContext;
