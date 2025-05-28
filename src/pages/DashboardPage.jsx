
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Briefcase, MapPin, Code2, Database } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";


const fadeIn = "animate-fade-in";
const scaleIn = "animate-scale-in";


const DashboardPage = () => {
  const location = useLocation();


  const isRootDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar />
        <main className={`p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full ${fadeIn}`}>
          {isRootDashboard ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-6 animate-fade-in">
                Dashboard
              </h1>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
                {[
                  {
                    label: "Total Resumes",
                    value: totalResumes,
                    suffix: "",
                    color: "text-blue-600",
                  },
                  {
                    label: "Average ATS Score",
                    value: avgATSScore,
                    suffix: "%",
                    color: "text-blue-600",
                  },
                  {
                    label: "Top Resume Score",
                    value: topATSScore,
                    suffix: "%",
                    color: "text-blue-600",
                  },
                ].map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={`bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition transform hover:-translate-y-1 ${scaleIn}`}
                    style={{ animationDelay: `${idx * 0.1 + 0.1}s` }}
                  >
                    <h2 className="text-sm text-gray-500">{metric.label}</h2>
                    <p className={`text-3xl font-bold ${metric.color} mt-2`}>
                      <span className="count-up" data-value={metric.value}>
                        {metric.value}
                      </span>
                      {metric.suffix}
                    </p>
                  </div>
                ))}
              </div>

              
              <h2 className="text-xl font-semibold text-gray-700 mb-4 animate-fade-in">
                Job Recommendations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {jobRecommendations.map((job, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition transform hover:-translate-y-1 ${scaleIn}`}
                    style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="animate-bounce">{job.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center mt-2 text-pink-600 text-sm">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
