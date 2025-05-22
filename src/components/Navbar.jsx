import { Bell, User, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-wrap justify-between items-center gap-4 transition-all duration-300">
    
      <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
        <input
          type="text"
          placeholder="Search jobs..."
          className={`w-full sm:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all font-sans text-sm text-gray-700 ${
            searchFocused ? "shadow-lg scale-105" : ""
          }`}
          aria-label="Search jobs"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <Search
          className={`absolute left-3 top-2.5 text-gray-500 transition-all duration-300 ${
            searchFocused ? "text-blue-500 scale-110" : ""
          }`}
          size={18}
        />
      </div>

      
      <div className="flex items-center space-x-6">
        
        <div className="relative">
          <button
            aria-label="Notifications"
            className="hover:scale-110 transition-all duration-200 ease-in-out p-2 rounded-full hover:bg-blue-100 focus:ring-2 focus:ring-blue-300"
            onClick={() => setShowNotif((v) => !v)}
          >
            <Bell className="text-gray-600 hover:text-blue-600 transition-colors duration-200" size={22} />
            
            <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {showNotif && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in z-10">
              <div className="p-4 text-sm text-gray-700">No new notifications</div>
            </div>
          )}
        </div>

       
        <button
          aria-label="User Profile"
          className="hover:scale-110 transition-all duration-200 ease-in-out p-2 rounded-full hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 group"
        >
          <User className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200" size={22} />
        </button>
      </div>
     
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
