import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyReviewPage from "./pages/CompanyReviewPage";
import JobListingPage from "./pages/JobListingPage";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";

function App() {
  return (
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
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
