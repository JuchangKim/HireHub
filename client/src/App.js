import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyReviewPage from './pages/CompanyReviewPage';

import CompanyListPage from './pages/CompanyListPage';
import CompyProfilePage from './pages/CompanyInfoPage';



import PostJobPage from './pages/PostJobPage';  

import JobListingPage from './pages/JobListingPage';


import Navbar from './components/Navbar';

  
function App() {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const handleLogout = () => {
      // Simply set isAuthenticated to false on logout
      setIsAuthenticated(false);
    };
  
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
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
