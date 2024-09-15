// client/src/pages/CompanyInfoPage.js
import React, { useEffect, useState } from 'react';
import CompanyInfo from '../components/CompanyInfo';
import { useParams } from 'react-router-dom';
import './CompanyInfo.css';

// Example company data with detailed information
const exampleCompanies = [
    {
        id: '1',
        name: 'Tech Corp',
        location: 'San Francisco, CA',
        description: 'Tech Corp is a leading technology company focused on AI, machine learning, and cloud computing solutions. It is known for its innovative approach to solving complex problems in various industries.',
        reviews: ['Excellent work-life balance', 'Innovative projects', 'Cutting-edge technology', 'Competitive salaries', 'Diverse and inclusive culture']
    },
    {
        id: '2',
        name: 'Web Solutions',
        location: 'Austin, TX',
        description: 'Web Solutions is a full-stack web development company specializing in building dynamic, responsive websites and applications for businesses of all sizes. It is recognized for delivering high-quality, user-friendly products.',
        reviews: ['Friendly work environment', 'Opportunities for career growth', 'Flexible working hours', 'Health and wellness programs', 'Team-oriented culture']
    },
    {
        id: '3',
        name: 'Backend Inc.',
        location: 'New York, NY',
        description: 'Backend Inc. specializes in providing robust server-side solutions, including APIs, database management, and microservices architecture. The company serves global clients in the finance, healthcare, and retail sectors.',
        reviews: ['Great learning opportunities', 'Strong focus on backend technologies', 'Supportive management', 'Remote work options', 'Competitive retirement plans']
    },
    {
        id: '4',
        name: 'DevOps Hub',
        location: 'Seattle, WA',
        description: 'DevOps Hub is dedicated to building scalable DevOps infrastructure for enterprises. Their services include CI/CD pipelines, cloud management, and automation. They are known for driving operational efficiency and innovation in IT environments.',
        reviews: ['Collaborative teams', 'Advanced DevOps tools and practices', 'Work-from-home flexibility', 'Generous vacation policies', 'Focus on professional development']
    },
    {
        id: '5',
        name: 'Tracking',
        location: 'Chicago, IL',
        description: 'Tracking is a logistics and supply chain management company that specializes in real-time tracking solutions for shipments, inventory management, and fleet management. Their cutting-edge technologies optimize logistics workflows for businesses worldwide.',
        reviews: ['Fast-paced and exciting projects', 'Focus on logistics innovation', 'Employee stock options', 'Comprehensive health insurance', 'Friendly and supportive coworkers']
    }
];

const CompanyInfoPage = () => {
    const { companyId } = useParams();
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        // Simulating fetching company data by ID
        const company = exampleCompanies.find(company => company.id === companyId);
        setCompanyData(company);
    }, [companyId]);

    return (
        <div>
            {companyData ? (
                <CompanyInfo company={companyData} />
            ) : (
                <p>Company information not found.</p>
            )}
        </div>
    );
};

export default CompanyInfoPage;
