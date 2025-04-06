import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import DashboardHome from "./pages/DashboardHome";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <>
      {/* Global Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* Dashboard with Nested Routes */}
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHome />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="resume-analysis" element={<ResumeAnalysisPage />} />
          </Route>

          {/* Fallback for 404 */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20">
                <h1 className="text-3xl font-bold text-red-600">404 | Page Not Found</h1>
                <p className="text-gray-500 mt-4">
                  Oops! The page you're looking for doesn't exist.
                </p>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
