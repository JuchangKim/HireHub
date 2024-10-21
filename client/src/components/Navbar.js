// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import './Navbar.css';

function Navbar() {
    const { isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme(); // Get the current theme and toggle function

    return (
        <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">HireHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/jobs">Job Listings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/post-job">Post Job</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/company-reviews">Company Reviews</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/company-profile">Company Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/salary-estimator">Salary Estimator</Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Dark/Light Mode Toggle Button */}
                    <button
                        className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                        onClick={toggleTheme}
                        style={{ marginLeft: 'auto' }} // Ensures it aligns to the far right
                    >
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
