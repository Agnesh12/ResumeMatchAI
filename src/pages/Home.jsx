import { Link } from "react-router-dom";
import Button from "../components/Button";
import resumeImage from "../assets/resume.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 motion-safe:animate-fade-in">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob1"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob2"></div>
      </div>

      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center transition-all transform hover:scale-105 hover:shadow-2xl duration-300 motion-safe:animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight motion-safe:animate-slide-in">
          <span className="inline-block animate-gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Powered Resume Analyzer & Job Matcher
          </span>
        </h1>

        <p className="text-gray-600 mt-4 text-base sm:text-lg motion-safe:animate-fade-in delay-200">
          Upload your resume to receive instant ATS feedback and tailored job opportunities powered by AI.
        </p>

        <img
          src={resumeImage}
          alt="Resume Analysis Illustration"
          className="w-full max-w-sm mx-auto mt-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 animate-bounce-slow"
        />

        <Link to="/dashboard">
          <Button className="mt-8 text-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 animate-pulse">
            Upload Resume & Get Jobs
          </Button>
        </Link>
      </div>

      
      <style>
        {`
          @keyframes blob1 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.1); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(30px) scale(1.05); }
          }
          .animate-blob1 { animation: blob1 8s ease-in-out infinite; }
          .animate-blob2 { animation: blob2 10s ease-in-out infinite; }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow { animation: bounce-slow 3s infinite; }
          @keyframes gradient-text {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradient-text 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
