import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyReviewPage from './pages/CompanyReviewPage';
import Navbar from './components/Navbar';

  
function App() {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const handleLogout = () => {
      // Simply set isAuthenticated to false on logout
      setIsAuthenticated(false);
    };
  
  return (
    <Router>
     <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/job/:id" element={<JobDetailsPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/company-reviews" element={<CompanyReviewPage />} />
      {/* Conditionally render the Login and Register routes */}
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<RegisterPage />} />
        </>
      ) : null}
    </Routes>
  </Router>
  );
}

export default App;
