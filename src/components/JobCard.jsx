import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({ job }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-md border transition-all duration-300 relative overflow-hidden
        ${hovered ? "shadow-2xl scale-105 border-blue-300" : "border-transparent"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
     
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 pointer-events-none
          ${hovered ? "bg-blue-50 opacity-100 scale-110" : "opacity-0 scale-100"}
        `}
      />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-blue-700 transition-colors duration-300">{job.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{job.company}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
        <Link
          to={`/dashboard/jobs/${job.id}`}
          aria-label={`View details for ${job.title}`}
          className={`inline-block mt-4 px-5 py-2.5 rounded-2xl shadow-md transition-all duration-300
            ${hovered
              ? "bg-blue-700 text-white scale-105 shadow-lg"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"}
          `}
          tabIndex={0}
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            View Details
            <svg
              className="inline ml-2 w-4 h-4 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
