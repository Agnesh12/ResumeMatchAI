import React from "react";

const SkeletonLoader = ({
  height = "h-6",
  width = "w-full",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${height} ${width} ${rounded} my-2 ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite linear;
            background-size: 200% 100%;
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;
