import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-500";
    case "Interview":
      return "bg-green-500";
    case "Rejected":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyAnim, setApplyAnim] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job not found");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setJob(null);
        setLoading(false);
      });
  }, [id]);

  const handleApply = () => {
    setApplyAnim(true);
    setTimeout(() => {
      setApplyAnim(false);
      alert("Application submitted!"); 
    }, 1200);
  };

  if (loading) return <Spinner />;

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 animate-fade-in">
        <p className="text-red-500 text-lg mb-4">🚫 Job not found.</p>
        <button
          onClick={() => navigate("/dashboard/jobs")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10 animate-fade-in">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl transform transition-all duration-500 animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">{job.title}</h2>
        <p className="text-gray-600 text-sm mt-1 animate-fade-in">
          {job.company} - {job.location}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed animate-fade-in">{job.description}</p>

        {job.status && (
          <span
            className={`inline-block mt-4 px-4 py-1 text-sm rounded-full text-white shadow-lg transition-all duration-500 animate-bounce-in ${getStatusColor(job.status)}`}
          >
            {job.status}
          </span>
        )}

        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition transform hover:-translate-x-1"
          >
            ← Back to Jobs
          </button>
          <button
            onClick={handleApply}
            className={`px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform ${
              applyAnim ? "scale-110 animate-pulse" : "hover:scale-105"
            }`}
            disabled={applyAnim}
          >
            {applyAnim ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
     
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease;
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(.4,2,.6,1);
        }
        .animate-bounce-in {
          animation: bounceIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0.5;}
          60% { transform: scale(1.05);}
          100% { transform: scale(1); opacity: 1;}
        }
      `}</style>
    </div>
  );
};

export default JobDetails;
