import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const ResumeUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUploading(true);
      setTimeout(() => {
        setFile(selectedFile);
        setUploading(false);
        setUploaded(true);
        onFileUpload(selectedFile);
        setTimeout(() => setUploaded(false), 2000);
      }, 1200); 
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setUploading(true);
      setTimeout(() => {
        setFile(droppedFile);
        setUploading(false);
        setUploaded(true);
        onFileUpload(droppedFile);
        setTimeout(() => setUploaded(false), 2000);
      }, 1200);
    }
  };

  const handleAreaClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg animate-fade-in">
    
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={handleAreaClick}
        className={`transition-all duration-300 border-2 border-dashed rounded-xl p-10 cursor-pointer flex flex-col items-center justify-center text-center relative overflow-hidden
        ${dragOver ? "border-blue-500 bg-blue-100 scale-105 shadow-lg" : "border-gray-300 bg-gray-100"}
        ${uploading ? "opacity-60 pointer-events-none" : ""}
        `}
        style={{ minHeight: 180 }}
      >
        <div className={`transition-transform duration-500 ${dragOver ? "scale-125" : ""}`}>
          {uploaded ? (
            <CheckCircle2 className="text-green-500 mb-2 animate-bounce-in" size={40} />
          ) : (
            <UploadCloud className="text-blue-500 mb-2 animate-fade-in" size={36} />
          )}
        </div>
        <p className="text-gray-700 font-semibold">
          {dragOver
            ? "Drop your resume here!"
            : uploading
            ? "Uploading..."
            : "Drag & Drop your resume here"}
        </p>
        <p className="text-sm text-gray-500">Only PDF, DOC, DOCX files are allowed</p>
        
        {uploading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100">
            <div className="h-full bg-blue-500 animate-progress-bar" />
          </div>
        )}
      </div>

      <p className="text-gray-500 my-4 text-center animate-fade-in">or</p>

      
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        id="resumeUpload"
        className="hidden"
        onChange={handleFileChange}
        ref={inputRef}
        disabled={uploading}
      />
      <label
        htmlFor="resumeUpload"
        className={`block w-fit mx-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all cursor-pointer
        ${uploading ? "opacity-60 pointer-events-none" : ""}
        animate-fade-in`}
        tabIndex={0}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleAreaClick()}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </label>

      
      {file && (
        <p className="mt-4 text-green-600 text-sm text-center truncate animate-slide-in">
          ✅ <strong>Uploaded:</strong> {file.name}
        </p>
      )}

      
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-in {
          animation: slideIn 0.5s;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-bounce-in {
          animation: bounceIn 0.7s;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.5);}
          60% { transform: scale(1.2);}
          100% { transform: scale(1);}
        }
        .animate-progress-bar {
          animation: progressBar 1.2s linear;
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ResumeUpload;
