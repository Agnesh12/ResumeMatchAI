import { Bell, User, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-wrap justify-between items-center gap-4">
      {/* Search Bar */}
      <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full sm:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all font-sans text-sm text-gray-700"
          aria-label="Search jobs"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification */}
        <button
          aria-label="Notifications"
          className="hover:scale-110 transition-all duration-200 ease-in-out p-2 rounded-full hover:bg-blue-100"
        >
          <Bell className="text-gray-600 hover:text-blue-600" size={22} />
        </button>

        {/* User Profile */}
        <button
          aria-label="User Profile"
          className="hover:scale-110 transition-all duration-200 ease-in-out p-2 rounded-full hover:bg-blue-100"
        >
          <User className="text-gray-600 hover:text-blue-600" size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
