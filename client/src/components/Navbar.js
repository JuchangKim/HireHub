import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                    <Link className="nav-link" to="/profile"> My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/company-reviews">Company Reviews</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link className="nav-link" to="/company-profile">Company Profile</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link className="nav-link" to="/industry-news">Industry News</Link>
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
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
