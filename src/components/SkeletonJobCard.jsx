const SkeletonJobCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg animate-pulse space-y-3">
      {/* Job Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>

      {/* Company & Location */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Description */}
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>

      {/* Status or Tags */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>

      {/* Button placeholder */}
      <div className="h-9 bg-gray-300 rounded-md w-32 mt-4"></div>
    </div>
  );
};

export default SkeletonJobCard;
