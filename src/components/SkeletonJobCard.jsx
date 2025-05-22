import React from "react";

const SkeletonJobCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg animate-pulse space-y-3 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent animate-shimmer pointer-events-none" />

      
      <div className="h-6 bg-gray-300 rounded w-3/4 transition-all duration-700" />

     
      <div className="h-4 bg-gray-300 rounded w-1/2 transition-all duration-700 delay-100" />

      
      <div className="h-4 bg-gray-300 rounded w-full transition-all duration-700 delay-200" />
      <div className="h-4 bg-gray-300 rounded w-5/6 transition-all duration-700 delay-300" />

      
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-2 transition-all duration-700 delay-400" />

      
      <div className="h-9 bg-gray-300 rounded-md w-32 mt-4 transition-all duration-700 delay-500" />
    </div>
  );
};

export default SkeletonJobCard;

/* Add this to your CSS (e.g., index.css or Tailwind config)
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(209,213,219,0.2) 50%,
    transparent 100%
  );
  z-index: 1;
}
*/
