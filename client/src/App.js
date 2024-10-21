// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyReviewPage from './pages/CompanyReviewPage';
import JobListingPage from './pages/JobListingPage';
import LogoutPage from './pages/LogoutPage';
import PostJobPage from './pages/PostJobPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import ProfilePage from './pages/ProfilePage';
import SalaryEstimator from './pages/SalaryEstimator';
import LeisurePage from './pages/LeisurePage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import EditJobPage from './pages/EditJobPage';

import './App.css';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// ProtectedRoute component to protect specific routes
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

// Main App component
function App() {
    return (
        <AuthProvider>
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
                {/* Add more user-specific routes if needed */}
            </Routes>
        );
    }

    // Default behavior for unauthorized access or unknown userType
    return <Navigate to="/login" />;
}

export default App;
