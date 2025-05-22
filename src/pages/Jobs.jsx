import { useEffect, useState } from "react";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    match: 92,
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "CloudStride",
    location: "Bangalore, India",
    match: 87,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateX",
    location: "Chennai, India",
    match: 80,
  },
  {
    id: 4,
    title: "React Developer",
    company: "ByteLabs",
    location: "Mumbai, India",
    match: 89,
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="px-4 md:px-8 py-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 transition-colors duration-700">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center animate-fade-in">
        Job Recommendations
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-2xl p-6 shadow-md h-44 flex flex-col justify-center items-center"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, idx) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1 transition-colors duration-200 group-hover:text-blue-700">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-sm text-gray-500 mb-3">{job.location}</p>
              <div className="flex items-center gap-2">
                <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium shadow-sm animate-pulse-slow">
                  Match: {job.match}%
                </span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
                    style={{ width: `${job.match}%` }}
                  ></div>
                </div>
              </div>
              <button className="mt-5 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-fade-in">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

     
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1;}
          50% { opacity: 0.6;}
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Jobs;
