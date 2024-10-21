<<<<<<< HEAD
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
=======
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyReviewPage from './pages/CompanyReviewPage';
// import IndustryNewsPage
import IndustryNewsPage from './pages/IndustryNewsPage';
import IndustryNewsDetailsPage from './pages/IndustryNewsDetailsPage';

import JobListingPage from './pages/JobListingPage';
import LogoutPage from './pages/LogoutPage';
import PostJobPage from './pages/PostJobPage';
import CompyProfilePage from './pages/CompanyProfilePage';
import ProfilePage from './pages/ProfilePage';
<<<<<<< HEAD
import AddCompanyInfoPage from './pages/AddCompanyInfoPage';
import EditJobPage from './pages/EditJobPage';
import EditJobForm from './pages/EditJobForm';
import EditCompanyForm from './pages/EditCompanyForm';
import EditCompyInfoPage from './pages/EditCompyInfo';
=======
import SalaryEstimator from './pages/SalaryEstimator';

import './App.css';

>>>>>>> merge-branch-sprint-2
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <AuthProvider>
<<<<<<< HEAD
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
=======
            <ThemeProvider>
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
                        <Route path="/salary-estimator" element={<SalaryEstimator />} />
                    </Routes>
                </Router>
            </ThemeProvider>
>>>>>>> merge-branch-sprint-2
        </AuthProvider>
    );
>>>>>>> 1ad35051bb95e72b47158e6b27a5fd7dbab846a4
}

export default App;
