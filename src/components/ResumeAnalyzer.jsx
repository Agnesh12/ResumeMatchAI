// src/components/ResumeAnalyzer.jsx
import React, { useState } from "react";
import axios from "axios";
import ResumeUpload from "./ResumeUpload";

const ResumeAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    setError("");
    setLoading(true);
    setAnalysis(null);

    try {
      // Step 1: Upload file and extract text
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post("http://localhost:8082/resume/upload", formData);
      const extractedText = uploadRes.data;

      // Step 2: Analyze extracted text (correct format)
      const analyzeRes = await axios.post(
        "http://localhost:8082/resume/analyze",
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Resume Analyzer</h1>

      <ResumeUpload onFileUpload={handleFileUpload} />

      {loading && <p className="text-blue-600 mt-6">Analyzing your resume...</p>}
      {error && <p className="text-red-500 mt-6">{error}</p>}

      {analysis && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">📊 ATS Report</h2>

          <p><strong>Score:</strong> {analysis.atsScore} / 100</p>

          <div className="mt-4">
            <p className="font-medium text-green-700">✅ Matched Keywords:</p>
            <ul className="list-disc ml-6 text-sm">
              {analysis.matchedKeywords?.map((kw, i) => <li key={i}>{kw}</li>)}
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-medium text-blue-700">💪 Strengths:</p>
            <ul className="list-disc ml-6 text-sm">
              {analysis.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-medium text-orange-700">⚠️ Weaknesses:</p>
            <ul className="list-disc ml-6 text-sm">
              {analysis.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-medium text-purple-700">💡 Suggestions:</p>
            <ul className="list-disc ml-6 text-sm">
              {analysis.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
