import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { jobList } from "../data/jobsData";
import { matchJobs } from "../utils/matchJobs";

const ResumeAnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAtsScore(null);
    setMatchedKeywords([]);
    setSuggestions([]);
    setMatchedJobs([]);
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
      // ✅ Use relative paths (proxy takes care of it)
      const uploadRes = await fetch(`/resume/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Resume upload failed.");
      const resumeText = await uploadRes.text();

      const analyzeRes = await fetch(`/resume/analyze`, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 font-sans">
          Resume Analysis
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
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
        </div>

        {/* Result Section */}
        {atsScore !== null && !loading && (
          <div className="space-y-6">
            {/* ATS Score Bar */}
            <div>
              <h2 className="text-xl font-bold text-blue-700 mb-2">ATS Score</h2>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className={`h-6 rounded-full text-white text-sm font-semibold flex items-center justify-center transition-all duration-700 ease-in-out ${
                    atsScore > 75
                      ? "bg-green-500"
                      : atsScore > 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${atsScore}%` }}
                >
                  {atsScore}%
                </div>
              </div>
            </div>

            {/* Matched Keywords */}
            {matchedKeywords.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Matched Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Suggestions
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {suggestions.map((sug, i) => (
                    <li key={i}>⚠️ {sug}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
              >
                Download ATS Report
              </button>
            </div>

            {/* Job Recommendations */}
            {matchedJobs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
                  🎯 Recommended Jobs
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                      <div className="text-3xl mb-2">{job.icon}</div>
                      <h4 className="text-lg font-semibold">{job.title}</h4>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <p className="text-pink-500 text-sm">{job.location}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysisPage;
