// src/components/Settings.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();

    const handleThemeChange = (event) => {
        if (event.target.value === 'dark') {
            toggleTheme(); // Toggle to dark mode
        } else {
            toggleTheme(); // Toggle to light mode
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <label>
                Theme:
                <select value={theme} onChange={handleThemeChange}>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                </select>
            </label>
        </div>
    );
};

export default Settings;
