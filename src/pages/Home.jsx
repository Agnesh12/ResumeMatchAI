import { Link } from "react-router-dom";
import Button from "../components/Button"; // Reusable styled button
import resumeImage from "../assets/resume.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 motion-safe:animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight motion-safe:animate-slide-in">
          AI-Powered Resume Analyzer & Job Matcher
        </h1>

        <p className="text-gray-600 mt-4 text-base sm:text-lg motion-safe:animate-fade-in delay-200">
          Upload your resume to receive instant ATS feedback and tailored job opportunities powered by AI.
        </p>

        <img
          src={resumeImage}
          alt="Resume Analysis Illustration"
          className="w-full max-w-sm mx-auto mt-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />

        <Link to="/dashboard">
          <Button className="mt-8 text-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300">
            Upload Resume & Get Jobs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
