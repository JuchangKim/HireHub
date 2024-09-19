// client/src/components/CompanyInfo.js
import React from 'react';
import '../pages/CompanyInfo.css';
const CompanyInfo = ({ company }) => {
    return (
        <div className="company-info-container">
            <h1>{company.name}</h1>

            <p><h3>Description:</h3> {company.description}</p>


            <p><h3>Reviews:</h3> {company.reviews}</p>

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

            <p><h3>Culture</h3> {company.Culture}</p>

            <h3>ContactInfo</h3>
            <ul>
                {company.ContactInfo && company.ContactInfo.length > 0 ? (
                    company.ContactInfo.map((ContactInfo, index) => (
                        <li key={index}>{ContactInfo}</li>
                    ))
                ) : (
                    <li>No employee benefits available</li>
                )}
            </ul>


        </div>
    );
};

export default CompanyInfo;