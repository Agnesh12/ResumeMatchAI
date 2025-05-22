const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4 drop-shadow">
        👋 Welcome to Your Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Effortlessly analyze resumes, discover job matches, and unlock more features using the sidebar. Start your journey towards a smarter career today!
      </p>
      <div className="flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">
          Analyze Resume
        </button>
        <button className="bg-white border border-blue-600 text-blue-700 font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-50 transition">
          View Job Matches
        </button>
      </div>
    </div>
  );
};

export default Welcome;
  