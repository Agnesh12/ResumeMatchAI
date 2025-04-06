import { useNavigate } from "react-router-dom";

const JobsPage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (jobId) => {
    navigate(`/dashboard/jobs/${jobId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Available Jobs</h1>
      <p className="text-gray-700 mb-6">
        Explore curated job opportunities based on your profile and resume analysis.
      </p>

      {/* Placeholder Job Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-blue-800">Frontend Developer</h2>
          <p className="text-sm text-gray-600 mt-1">Location: Remote | Type: Full-time</p>
          <button
            onClick={() => handleViewDetails(1)}
            className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-blue-800">Backend Engineer</h2>
          <p className="text-sm text-gray-600 mt-1">Location: Bangalore | Type: Onsite</p>
          <button
            onClick={() => handleViewDetails(2)}
            className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>

        {/* Add more job cards and unique IDs here */}
      </div>
    </div>
  );
};

export default JobsPage;
