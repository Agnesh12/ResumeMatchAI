import { useState } from "react";

const Topbar = () => {
  const [notifActive, setNotifActive] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center transition-all duration-300">
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight animate-fade-in">
        ResumeMatchAI
      </h1>

      <div className="flex items-center gap-4">
      
        <button
          className={`p-2 rounded-full relative transition hover:bg-gray-100 focus:outline-none ${
            notifActive ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setNotifActive((prev) => !prev)}
          aria-label="Notifications"
        >
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
              notifActive ? "rotate-12 scale-110" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 
                6.165 8 7.388 8 8.75v5.407a2.032 2.032 0 
                01-.595 1.437L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
         
          <span
            className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ${
              notifActive ? "animate-ping" : ""
            }`}
          ></span>
        </button>

       
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold shadow cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg animate-fade-in">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;