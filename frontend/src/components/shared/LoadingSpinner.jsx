import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-ocean-50">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-ocean-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-ocean-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
