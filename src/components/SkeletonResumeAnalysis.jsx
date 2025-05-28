import React from "react";

const SkeletonResumeAnalysis = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl animate-pulse transition hover:shadow-xl w-full max-w-xl mx-auto relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-skeleton-shimmer" />
      </div>

      <div className="relative z-10 h-6 bg-gray-300 rounded-md w-1/3 mb-6 flex items-center">
        <div className="h-4 w-4 bg-gray-200 rounded-full mr-2 animate-bounce" />
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
      </div>

      
      <div className="mb-4 relative z-10">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3 animate-skeleton-bar" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-3 animate-skeleton-bar delay-150" />
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-skeleton-bar delay-300" />
      </div>

     
      <div className="relative z-10">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3 animate-skeleton-bar" />
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-skeleton-bar delay-150" />
      </div>
    </div>
  );
};

export default SkeletonResumeAnalysis;


