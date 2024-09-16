// client/src/components/CompanyInfo.js
import React from 'react';
import '../pages/CompanyInfo.css';  
const CompanyInfo = ({ company }) => {
    return (
        <div className="company-info-container">  
            <h1>{company.name}</h1>
            <p>Location: {company.location}</p>
            <p>Description: {company.description}</p>
            <h3>Employee Benefits:</h3>
            <ul>
                {company.reviews && company.reviews.length > 0 ? (
                    company.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                    ))
                ) : (
                    <li>No employee benefits available</li>
                )}
            </ul>
        </div>
    );
};

export default CompanyInfo;
