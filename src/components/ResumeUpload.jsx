import { useState } from "react";
import { UploadCloud } from "lucide-react";

const ResumeUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        className={`transition-all duration-300 border-2 border-dashed rounded-xl p-10 cursor-pointer flex flex-col items-center justify-center text-center
        ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"}`}
      >
        <UploadCloud className="text-blue-500 mb-2" size={36} />
        <p className="text-gray-700 font-semibold">Drag & Drop your resume here</p>
        <p className="text-sm text-gray-500">Only PDF, DOC, DOCX files are allowed</p>
      </div>

      <p className="text-gray-500 my-4 text-center">or</p>

      {/* File Upload Input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        id="resumeUpload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="resumeUpload"
        className="block w-fit mx-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all cursor-pointer"
      >
        Upload Resume
      </label>

      {/* Uploaded File Info */}
      {file && (
        <p className="mt-4 text-green-600 text-sm text-center truncate">
          ✅ <strong>Uploaded:</strong> {file.name}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
