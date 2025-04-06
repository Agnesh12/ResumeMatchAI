// src/components/JobRecommendations.jsx
import { Briefcase, Building2, Star } from "lucide-react";

const jobData = [
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    match: "87%",
    location: "Remote",
  },
  {
    title: "Full Stack Engineer",
    company: "InnoSoft Solutions",
    match: "91%",
    location: "Bangalore, India",
  },
  {
    title: "React Developer",
    company: "CreativeMinds",
    match: "78%",
    location: "Chennai, India",
  },
  {
    title: "Software Engineer Intern",
    company: "FutureTech",
    match: "85%",
    location: "Remote",
  },
];

const JobRecommendations = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        Recommended Jobs for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" />
              {job.title}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              {job.company}
            </p>
            <p className="mt-2 text-sm text-gray-500">{job.location}</p>
            <div className="mt-3 text-sm">
              <span className="text-blue-600 font-semibold">
                Match Score: {job.match}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
