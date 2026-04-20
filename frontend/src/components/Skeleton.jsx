// components/Skeleton.jsx
import React from 'react';

const Skeleton = ({ type = 'card', height = 64, className = '' }) => {
  const skeletons = Array(6).fill(0);

  if (type === 'services') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 animate-pulse">
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-2xl mb-6"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="space-y-8 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 w-3/4 animate-pulse"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 w-full animate-pulse"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Generic card skeleton with height prop
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse ${className}`}>
      <div className={`bg-gray-300 dark:bg-gray-600 rounded w-full`} style={{ height: `${height}px` }}></div>
    </div>
  );
};

export default Skeleton;