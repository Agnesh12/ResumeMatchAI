import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { jobList } from "../data/jobsData";
import { matchJobs } from "../utils/matchJobs";
import { AnimatePresence, motion} from "framer-motion"; // <-- added motion import

const ResumeAnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAtsScore(null);
    setMatchedKeywords([]);
    setSuggestions([]);
    setMatchedJobs([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setAtsScore(null);
      setMatchedKeywords([]);
      setSuggestions([]);
      setMatchedJobs([]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const uploadRes = await fetch(`http://localhost:8080/resume/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Resume upload failed.");
      const resumeText = await uploadRes.text();

      const analyzeRes = await fetch(`http://localhost:8080/resume/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: resumeText,
      });

      if (!analyzeRes.ok) throw new Error("Resume analysis failed.");
      const data = await analyzeRes.json();

      const keywords = data.matchedKeywords || [];
      setAtsScore(data.atsScore || 0);
      setMatchedKeywords(keywords);
      setSuggestions(data.suggestions || []);

      const jobs = matchJobs(keywords, jobList);
      setMatchedJobs(jobs);

      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error("❌ Error during analysis:", error);
      toast.error("Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const content = `ATS Score: ${atsScore}%\n\nMatched Keywords:\n${matchedKeywords.join(
      ", "
    )}\n\nSuggestions:\n${suggestions.join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ATS_Report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
      >
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 font-sans">
          Resume Analysis
        </h1>

        <div
          className={`relative flex flex-col sm:flex-row sm:items-center gap-4 mb-6`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <label
            className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-gray-100"
            }`}
          >
            <UploadCloud className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-gray-700 text-sm mb-2">
              {file ? file.name : "Drag & drop your resume here or click to select"}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              tabIndex={-1}
            />
          </label>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" /> Analyzing...
              </div>
            ) : (
              "Upload & Analyze"
            )}
          </button>
          {dragActive && (
            <div className="absolute inset-0 rounded-lg border-4 border-blue-400 border-dashed bg-blue-100/50 pointer-events-none z-10" />
          )}
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full mb-4"
            >
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  className="h-2 bg-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {atsScore !== null && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-blue-700 mb-2">ATS Score</h2>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${atsScore}%` }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className={`h-6 rounded-full text-white text-sm font-semibold flex items-center justify-center transition-all duration-700 ease-in-out ${
                      atsScore > 75
                        ? "bg-green-500"
                        : atsScore > 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {atsScore}%
                  </motion.div>
                </div>
              </div>

              {matchedKeywords.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Matched Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((kw, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.05 * i }}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {kw}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                    Suggestions
                  </h3>
                  <ul className="list-disc list-inside text-yellow-800">
                    {suggestions.map((sug, i) => (
                      <li key={i}>{sug}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {matchedJobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">
                    Recommended Jobs
                  </h3>
                  <ul className="list-disc list-inside text-purple-800">
                    {matchedJobs.map((job) => (
                      <li key={job.id}>
                        {job.title} - {job.company}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <button
                onClick={handleDownload}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-2xl shadow transition-all duration-300"
              >
                Download Report
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResumeAnalysisPage;
