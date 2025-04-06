// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Briefcase, FileText } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/dashboard" },
    { label: "Jobs", icon: <Briefcase size={20} />, to: "/dashboard/jobs" },
    { label: "Resume Analysis", icon: <FileText size={20} />, to: "/dashboard/resume-analysis" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-400 to-blue-500 text-white p-6 z-40 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block shadow-lg md:shadow-none
        `}
      >
        <h1 className="text-2xl font-bold mb-10 tracking-wide">ResumeMatchAI</h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map(({ label, icon, to }) => {
              const isActive = location.pathname === to;

              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
                      ${isActive
                        ? "bg-white text-blue-600 shadow font-bold"
                        : "hover:bg-white/20 text-white"}
                    `}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
