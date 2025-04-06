const Button = ({ children, onClick, className = "", disabled, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-transform transform focus:outline-none focus:ring-4 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 hover:scale-105"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
