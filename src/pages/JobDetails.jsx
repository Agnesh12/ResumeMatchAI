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

  useEffect(() => {
    fetch(`http://localhost:8082/api/jobs/${id}`)
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

  if (loading) return <Spinner />;

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
        <p className="text-gray-600 text-sm mt-1">
          {job.company} - {job.location}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">{job.description}</p>

        {job.status && (
          <span
            className={`inline-block mt-4 px-4 py-1 text-sm rounded-full text-white ${getStatusColor(job.status)}`}
          >
            {job.status}
          </span>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            ← Back to Jobs
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
