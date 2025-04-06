const SkeletonLoader = ({ height = "h-6", width = "w-full", rounded = "rounded-md", className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 ${height} ${width} ${rounded} my-2 ${className}`}></div>
  );
};

export default SkeletonLoader;
