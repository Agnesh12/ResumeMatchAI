import { Link } from "react-router-dom";
import { useState } from "react";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "San Francisco, CA", status: "Applied" },
  { id: 2, title: "Software Engineer", company: "Microsoft", location: "Seattle, WA", status: "Interview" },
  { id: 3, title: "Backend Developer", company: "Amazon", location: "New York, NY", status: "Rejected" },
];

const statusColors = {
  Applied: "bg-blue-500",
  Interview: "bg-green-500",
  Rejected: "bg-red-500",
};

const JobList = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen px-4 py-8 sm:px-8 transition-colors duration-700">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight animate-fade-in">
        Job Applications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, idx) => (
          <article
            key={job.id}
            className={`relative p-6 bg-white shadow-lg rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group
              ${hoveredId === job.id ? "ring-4 ring-blue-200" : ""}
              animate-fade-in-up`}
            style={{ animationDelay: `${idx * 100}ms` }}
            onMouseEnter={() => setHoveredId(job.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="absolute -top-4 -right-4">
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg transition-colors duration-300 ${statusColors[job.status]}`}
                aria-label={`Status: ${job.status}`}
              >
                {job.status}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-blue-700">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-4">{job.company} – {job.location}</p>
            <div className="flex justify-end items-center mt-6">
              <Link
                to={`/dashboard/jobs/${job.id}`}
                title={`View details for ${job.title}`}
                className="px-5 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 scale-100 group-hover:scale-105"
              >
                <span className="inline-block animate-bounce-x">View Details</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
          .animate-fade-in-up { animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both; }
          @keyframes bounce-x {
            0%, 100% { transform: translateX(0);}
            50% { transform: translateX(5px);}
          }
          .animate-bounce-x { animation: bounce-x 1s infinite; }
        `}
      </style>
    </div>
  );
};

export default JobList;
