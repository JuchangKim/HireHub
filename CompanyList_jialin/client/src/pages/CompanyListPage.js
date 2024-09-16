// client/src/pages/CompanyListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyListPage.css'; // Add CSS for styling

// Example company data (same as used in CompanyInfoPage.js)
const exampleCompanies = [
    { id: '1', name: 'Tech Corp' },
    { id: '2', name: 'Web Solutions' },
    { id: '3', name: 'Backend Inc.' },
    { id: '4', name: 'DevOps Hub' },
    { id: '5', name: 'Tracking' }
];

const CompanyListPage = () => {
    return (
        <div className="company-list-container">
            <h1>Companies</h1>
            <ul className="company-list">
                {exampleCompanies.map(company => (
                    <li key={company.id}>
                        <Link to={`/company/${company.id}`} className="company-link">
                            {company.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyListPage;
