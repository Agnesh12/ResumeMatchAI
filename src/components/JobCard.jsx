import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border border-transparent hover:border-blue-200">
      <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      <Link
        to={`/dashboard/jobs/${job.id}`}
        aria-label={`View details for ${job.title}`}
        className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
