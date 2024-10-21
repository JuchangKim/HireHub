import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null); // Initialize userType

    // Fetch user type and auth status from localStorage or API
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const storedUserType = localStorage.getItem('userType'); // Fetch the userType from storage
            setUserType(storedUserType || 'user'); // Default to 'user' if undefined
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userType, setUserType }}>
            {children}
        </AuthContext.Provider>
    );
};
