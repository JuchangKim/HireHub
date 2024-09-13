import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyReviewPage from './pages/CompanyReviewPage';
import CompanyListPage from './pages/CompanyListPage';
import CompanyInfoPage from './pages/CompanyInfoPage';  
import PostJobPage from './pages/PostJobPage';  
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/company-reviews" element={<CompanyReviewPage />} />
        <Route path="/company" element={<CompanyListPage />} />
        <Route path="/company/:companyId" element={<CompanyInfoPage />} /> 
        <Route path="/post-job" element={<PostJobPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
