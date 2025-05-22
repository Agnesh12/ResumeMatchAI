
import { Briefcase, Building2, Star } from "lucide-react";
import { useState } from "react";

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
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2 animate-bounce">
        <Star className="w-5 h-5 text-yellow-500 animate-spin-slow" />
        Recommended Jobs for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobData.map((job, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-xl p-4 transition-all duration-300 cursor-pointer relative overflow-hidden group
              ${hovered === index ? "shadow-xl scale-105 bg-blue-50" : "hover:shadow-lg hover:scale-105"}
            `}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <h3 className="text-lg font-medium text-gray-800 mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500 animate-pulse" />
              {job.title}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              {job.company}
            </p>
            <p className="mt-2 text-sm text-gray-500">{job.location}</p>
            <div className="mt-3 text-sm flex items-center gap-2">
              <span className="text-blue-600 font-semibold">
                Match Score: 
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full animate-pop">
                {job.match}
              </span>
            </div>
            {hovered === index && (
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all duration-200 animate-fade-in-up">
                View Details
              </button>
            )}
          </div>
        ))}
      </div>
    
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in { animation: fade-in 0.7s ease; }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up { animation: fade-in-up 0.4s ease; }
          @keyframes pop {
            0% { transform: scale(0.8);}
            60% { transform: scale(1.1);}
            100% { transform: scale(1);}
          }
          .animate-pop { animation: pop 0.4s; }
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow { animation: spin-slow 3s linear infinite;}
        `}
      </style>
    </div>
  );
};

export default JobRecommendations;
