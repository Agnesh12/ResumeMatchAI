const Topbar = () => {
    return (
      <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">ResumeMatchAI</h1>
        
        <div className="flex items-center gap-4">
          {/* Placeholder notification icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              className="w-6 h-6 text-gray-600"
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
          </button>
  
          {/* Avatar (placeholder) */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold shadow">
            A
          </div>
        </div>
      </header>
    );
  };
  
  export default Topbar;
  