import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          HireHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
<<<<<<< HEAD
<<<<<<< Updated upstream
              <Link className="nav-link" to="/job/:id">Job Details</Link>
=======
              <Link className="nav-link" to="/jobs">Job Listings</Link>
>>>>>>> 6e2832b29e7485e3efcd287b35cad20ba95099b3
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/applications">Applications</Link>
=======
              <Link className="nav-link" to="/applications">
                Applications
              </Link>
>>>>>>> Stashed changes
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-profile">
                my-profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/company-reviews">
                Company Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
