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

  // Simulate API fetch
  useEffect(() => {
    const timeout = setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 1500); // 1.5s loading

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Job Recommendations</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-2xl p-6 shadow-md h-40"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-sm text-gray-500 mb-2">{job.location}</p>
              <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                Match: {job.match}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
