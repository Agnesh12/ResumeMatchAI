import { useNavigate } from "react-router-dom";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "Bangalore",
    type: "Onsite",
  },
  
];

const JobsPage = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleViewDetails = (jobId) => {
    navigate(`/dashboard/jobs/${jobId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 animate-slide-down">Available Jobs</h1>
      <p className="text-gray-700 mb-6 animate-fade-in delay-100">
        Explore curated job opportunities based on your profile and resume analysis.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`bg-blue-50 p-4 rounded-lg shadow transition-all duration-300 relative overflow-hidden
              ${hovered === job.id ? "scale-105 shadow-2xl ring-2 ring-blue-300" : "hover:scale-105 hover:shadow-2xl"}
              animate-fade-in-up`}
            onMouseEnter={() => setHovered(job.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              cursor: "pointer",
              boxShadow: hovered === job.id ? "0 8px 32px rgba(59,130,246,0.15)" : undefined,
            }}
          >
            <span
              className={`absolute top-0 left-0 w-1 h-full bg-blue-400 transition-all duration-300 ${
                hovered === job.id ? "w-2 bg-blue-600" : ""
              }`}
            />
            <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Location: {job.location} | Type: {job.type}
            </p>
            <button
              onClick={() => handleViewDetails(job.id)}
              className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded shadow transition-all duration-200 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="inline-block animate-bounce-x">View Details</span>
            </button>
          </div>
        ))}
      </div>
     
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s ease;
          }
          .animate-slide-down {
            animation: slideDown 0.7s cubic-bezier(.4,0,.2,1);
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(.4,0,.2,1);
          }
          .animate-bounce-x {
            animation: bounceX 1s infinite alternate;
          }
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes bounceX {
            from { transform: translateX(0);}
            to { transform: translateX(8px);}
          }
        `}
      </style>
    </div>
  );
};

export default JobsPage;
