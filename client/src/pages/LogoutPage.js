import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogoutPage() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        // Remove token and update authentication status
        localStorage.removeItem('token');
        setIsAuthenticated(false);

        // Redirect to the home page
        navigate('/');
    }, [navigate, setIsAuthenticated]);

    return (
        <div className="text-center mt-5">
            <h2>Logging out...</h2>
        </div>
    );
}

export default LogoutPage;
