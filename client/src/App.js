
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyReviewPage from "./pages/CompanyReviewPage";
import JobListingPage from "./pages/JobListingPage";
import LogoutPage from "./pages/LogoutPage";
import PostJobPage from "./pages/PostJobPage";
import CompyProfilePage from "./pages/CompanyProfilePage";
import ProfilePage from "./pages/ProfilePage";
import LeisurePage from "./pages/LeisurePage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";

import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/company-reviews" element={<CompanyReviewPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/company-profile" element={<CompyProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leisure" element={<LeisurePage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );



// Main App component
function App() {
    return (
        <AuthProvider>

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/job/:id" element={<JobDetailsPage />} />
                    <Route path="/jobs" element={<JobListingPage />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/company-reviews" element={<CompanyReviewPage />} />

                    <Route path="/industry-news" element={<IndustryNewsPage />} />
                    <Route path="/industry-news/:id" element={<IndustryNewsDetailsPage />} />
                    
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/post-job" element={<PostJobPage />} />
                    <Route path="/company-profile" element={<CompyProfilePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/addcompaniesinfo" element={<AddCompanyInfoPage />} />
                    <Route path="/editjob" element={<EditJobPage />} />
                    <Route path="/editjob/:jobId" element={<EditJobForm />} />
                    <Route path="/editcompyinfo" element={<EditCompyInfoPage />} />
                    <Route path="/editcompany/:companyId" element={<EditCompanyForm />} />


                </Routes>
            </Router>

            <ThemeProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        {/* Common routes accessible by everyone */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/job/:id" element={<JobDetailsPage />} />
                        <Route path="/jobs" element={<JobListingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<RegisterPage />} />
                        <Route path="/company-reviews" element={<CompanyReviewPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/salary-estimator" element={<ProtectedRoute><SalaryEstimator /></ProtectedRoute>} />
                        <Route path="/company-profile" element={<ProtectedRoute><CompanyProfilePage /></ProtectedRoute>} />
                        <Route path="/leisure" element={<LeisurePage />} />

                        {/* Conditionally render user or company routes based on userType */}
                        <Route path="/*" element={<AuthBasedRoutes />} />
                    </Routes>
                </Router>
            </ThemeProvider>

        </AuthProvider>
    );
}

// Component to handle dynamic routing based on user type (company or user)
function AuthBasedRoutes() {
    const { userType } = useAuth(); // Access userType from AuthContext

    if (userType === 'company') {
        return (
            <Routes>
                <Route path="/company-profile" element={<ProtectedRoute><CompanyProfilePage /></ProtectedRoute>} />
                <Route path="/post-job" element={<ProtectedRoute><PostJobPage /></ProtectedRoute>} />
                <Route path="/editjob" element={<ProtectedRoute><EditJobPage/></ProtectedRoute>} />
                <Route path="/editjob/:jobId" element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
                <Route path="/editcompyinfo" element={<ProtectedRoute><ManageCompanyInfo/></ProtectedRoute>} />
                <Route path="/editcompany/:companyId" element={<ProtectedRoute><ManageCompanyInfo /></ProtectedRoute>} />
                {/* Add more company-specific routes if needed */}
            </Routes>
        );
    }

    if (userType === 'user') {
        return (
            <Routes>
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
                <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
                <Route path="/industry-news" element={<ProtectedRoute><IndustryNewsPage /></ProtectedRoute>} />
                <Route path="/industry-news/:id" element={<ProtectedRoute><IndustryNewsDetailsPage /></ProtectedRoute>} />
                {/* Add more user-specific routes if needed */}
            </Routes>
        );
    }

    // Default behavior for unauthorized access or unknown userType
    return <Navigate to="/login" />;
}}

export default App;
