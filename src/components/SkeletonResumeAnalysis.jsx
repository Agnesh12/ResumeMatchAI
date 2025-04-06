const SkeletonResumeAnalysis = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl animate-pulse transition hover:shadow-xl w-full max-w-xl mx-auto">
      {/* ATS Score Placeholder */}
      <div className="h-6 bg-gray-300 rounded-md w-1/3 mb-6"></div>

      {/* Strengths Section */}
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Weaknesses Section */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonResumeAnalysis;
