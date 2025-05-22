import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  disabled,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg text-white font-semibold shadow-md
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4
        active:scale-95
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-300 hover:scale-105"
        }
        ${className}
      `}
      style={{
        boxShadow: disabled
          ? "none"
          : "0 4px 20px 0 rgba(59,130,246,0.15), 0 1.5px 4px 0 rgba(59,130,246,0.10)",
        outline: "none",
      }}
      aria-disabled={disabled}
    >
      <span className="flex items-center gap-2">
        {children}
        {!disabled && (
          <svg
            className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default Button;
