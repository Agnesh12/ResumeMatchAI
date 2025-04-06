import { Link } from "react-router-dom";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "San Francisco, CA", status: "Applied" },
  { id: 2, title: "Software Engineer", company: "Microsoft", location: "Seattle, WA", status: "Interview" },
  { id: 3, title: "Backend Developer", company: "Amazon", location: "New York, NY", status: "Rejected" },
];

const JobList = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Job Applications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="p-5 bg-white shadow-md rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-600 mt-1">{job.company} – {job.location}</p>

            <div className="mt-5 flex justify-between items-center">
              <span
                aria-label={`Status: ${job.status}`}
                className={`px-3 py-1 text-sm font-medium rounded-full text-white ${
                  job.status === "Applied"
                    ? "bg-blue-500"
                    : job.status === "Interview"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {job.status}
              </span>

              <Link
                to={`/dashboard/jobs/${job.id}`}
                title={`View details for ${job.title}`}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default JobList;
