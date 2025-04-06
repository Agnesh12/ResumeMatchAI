// src/pages/DashboardPage.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Briefcase, MapPin, Code2, Database } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();

  const isRootDashboard = location.pathname === "/dashboard";

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
        <main className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">
          {isRootDashboard ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
                <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
                  <h2 className="text-sm text-gray-500">Total Resumes</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{totalResumes}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
                  <h2 className="text-sm text-gray-500">Average ATS Score</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{avgATSScore}%</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
                  <h2 className="text-sm text-gray-500">Top Resume Score</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{topATSScore}%</p>
                </div>
              </div>

              {/* Job Recommendations */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Recommendations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {jobRecommendations.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      {job.icon}
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
