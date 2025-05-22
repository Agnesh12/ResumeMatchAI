
import React, { useState } from "react";
import axios from "axios";
import ResumeUpload from "./ResumeUpload";


const FadeIn = ({ children, delay = 0 }) => (
  <div
    style={{
      animation: `fadeIn 0.7s ease ${delay}s both`,
    }}
    className="animate-fade"
  >
    {children}
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}
    </style>
  </div>
);

const ResumeAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    setError("");
    setLoading(true);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post("http://localhost:8080/resume/upload", formData);
      const extractedText = uploadRes.data;

      const analyzeRes = await axios.post(
        "http://localhost:8080/resume/analyze",
        { text: extractedText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAnalysis(analyzeRes.data);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError("Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center p-6">
      <FadeIn>
        <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 drop-shadow-lg">
          AI Resume Analyzer
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ResumeUpload onFileUpload={handleFileUpload} />
      </FadeIn>

      {loading && (
        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center mt-8">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600 font-medium animate-pulse">Analyzing your resume...</p>
          </div>
        </FadeIn>
      )}

      {error && (
        <FadeIn delay={0.4}>
          <p className="text-red-500 mt-6 font-semibold">{error}</p>
        </FadeIn>
      )}

      {analysis && (
        <FadeIn delay={0.5}>
          <div className="mt-8 w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-purple-100 transition-all duration-500">
            <h2 className="text-2xl font-bold mb-4 text-purple-700 flex items-center gap-2">
              <span role="img" aria-label="chart">📊</span> ATS Report
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-semibold">Score:</span>
              <div className="relative w-40 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700"
                  style={{ width: `${analysis.atsScore}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-gray-700">
                  {analysis.atsScore} / 100
                </span>
              </div>
            </div>

            <FadeIn delay={0.2}>
              <div className="mt-4">
                <p className="font-medium text-green-700">✅ Matched Keywords:</p>
                <ul className="list-disc ml-6 text-sm">
                  {analysis.matchedKeywords?.map((kw, i) => (
                    <li key={i} className="animate-fadeIn">{kw}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-4">
                <p className="font-medium text-blue-700">💪 Strengths:</p>
                <ul className="list-disc ml-6 text-sm">
                  {analysis.strengths?.map((s, i) => (
                    <li key={i} className="animate-fadeIn">{s}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-4">
                <p className="font-medium text-orange-700">⚠️ Weaknesses:</p>
                <ul className="list-disc ml-6 text-sm">
                  {analysis.weaknesses?.map((w, i) => (
                    <li key={i} className="animate-fadeIn">{w}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-4">
                <p className="font-medium text-purple-700">💡 Suggestions:</p>
                <ul className="list-disc ml-6 text-sm">
                  {analysis.suggestions?.map((s, i) => (
                    <li key={i} className="animate-fadeIn">{s}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
