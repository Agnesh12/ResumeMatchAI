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
      
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          md:hidden
        `}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

     
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200 active:scale-95"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <span className="sr-only">{isOpen ? "Close sidebar" : "Open sidebar"}</span>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

     
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-400 to-blue-500 text-white p-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block shadow-lg md:shadow-none
          flex flex-col
        `}
        style={{
          boxShadow: isOpen ? "0 8px 32px 0 rgba(31, 38, 135, 0.37)" : undefined,
        }}
      >
        <h1 className="text-2xl font-bold mb-10 tracking-wide animate-fade-in-down">
          ResumeMatchAI
        </h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map(({ label, icon, to }, idx) => {
              const isActive = location.pathname === to;
              return (
                <li key={to} className="group">
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
                      relative overflow-hidden
                      ${isActive
                        ? "bg-white text-blue-600 shadow font-bold scale-105"
                        : "hover:bg-white/20 hover:scale-105 text-white"}
                      focus:outline-none focus:ring-2 focus:ring-blue-300
                      transition-transform duration-200
                    `}
                    style={{
                      transitionDelay: `${idx * 60}ms`,
                    }}
                  >
                    <span
                      className={`
                        transition-transform duration-300
                        group-hover:scale-125 group-hover:rotate-6
                        ${isActive ? "scale-125 rotate-6" : ""}
                      `}
                    >
                      {icon}
                    </span>
                    <span
                      className={`
                        transition-colors duration-200
                        ${isActive ? "text-blue-600" : "group-hover:text-blue-100"}
                      `}
                    >
                      {label}
                    </span>
                   
                    <span
                      className={`
                        absolute left-4 bottom-2 h-0.5 w-0 bg-blue-200 rounded-full transition-all duration-300
                        ${isActive || "group-hover:w-8"}
                        ${isActive ? "w-8 bg-blue-600" : ""}
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="mt-auto pt-10 text-xs text-blue-100 animate-fade-in-up">
          &copy; {new Date().getFullYear()} ResumeMatchAI
        </div>
      </aside>
      
      <style>
        {`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        `}
      </style>
    </>
  );
};

export default Sidebar;
