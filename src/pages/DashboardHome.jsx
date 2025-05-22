
import React from "react";
import { Briefcase, MapPin, Code2, Database } from "lucide-react";

const DashboardHome = () => {
  const totalResumes = 48;
  const avgATSScore = 72;
  const topATSScore = 95;

  const jobRecommendations = [
    {
      title: "Frontend Developer",
      company: "TechNova Solutions",
      location: "Remote",
      icon: <Briefcase size={20} className="text-indigo-500" />,
    },
    {
      title: "Backend Engineer",
      company: "CodeCrafters Inc.",
      location: "Bangalore, India",
      icon: <Database size={20} className="text-green-500" />,
    },
    {
      title: "Full Stack Developer",
      company: "DevSphere",
      location: "San Francisco, CA",
      icon: <Code2 size={20} className="text-purple-500" />,
    },
  ];

  
  const fadeIn = "opacity-0 translate-y-4 animate-fadeIn";
  

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 animate-fadeInSlow">Dashboard</h1>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[{
          label: "Total Resumes",
          value: totalResumes,
          suffix: "",
        }, {
          label: "Average ATS Score",
          value: avgATSScore,
          suffix: "%",
        }, {
          label: "Top Resume Score",
          value: topATSScore,
          suffix: "%",
        }].map((metric, idx) => (
          <div
            key={metric.label}
            className={`bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 ${fadeIn}`}
            style={{ animationDelay: `${idx * 0.15 + 0.1}s` }}
          >
            <h2 className="text-sm text-gray-500">{metric.label}</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2 animate-pulse">
              {metric.value}{metric.suffix}
            </p>
          </div>
        ))}
      </div>

      
      <h2 className="text-xl font-semibold text-gray-700 mb-4 animate-fadeInSlow" style={{ animationDelay: "0.5s" }}>
        Job Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobRecommendations.map((job, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300 transform hover:-translate-y-2 ${fadeIn}`}
            style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <span className="animate-bounce">{job.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{job.company}</p>
            <div className="flex items-center mt-2 text-pink-600 text-sm">
              <MapPin size={16} className="mr-1 animate-pulse" />
              {job.location}
            </div>
            <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardHome;
