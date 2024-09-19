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
        description: 'Tech Corp is a leading technology company focused on AI, machine learning, and cloud computing solutions. Their innovative approach helps solve complex industry challenges across sectors.',
        reviews: ['Excellent work-life balance', 'Innovative projects', 'Cutting-edge technology', 'Competitive salaries', 'Diverse and inclusive culture'],
        Culture: ['Innovative, inclusive, and employee-focused company with an emphasis on creativity and problem-solving.'],
        ContactInfo: ['email: info@techcorp.com', 'phone: 123-456-7890', 'address: 123 Main St, San Francisco, CA 94105']
    },
    {
        id: '2',
        name: 'Web Solutions',
        location: 'Austin, TX',
        description: 'Web Solutions is a web development company that creates dynamic, responsive websites and applications for businesses of all sizes. They are known for delivering user-friendly and high-quality products.',
        reviews: ['Friendly work environment', 'Opportunities for career growth', 'Flexible working hours', 'Health and wellness programs', 'Team-oriented culture'],
        Culture: ['Team-oriented, collaborative environment that prioritizes work-life balance and career development.'],
        ContactInfo: ['email: info@websolutions.com', 'phone: 987-654-3210', 'address: 456 Elm St, Austin, TX 73301']
    },
    {
        id: '3',
        name: 'Backend Inc.',
        location: 'New York, NY',
        description: 'Backend Inc. provides robust server-side solutions, including APIs, database management, and microservices. Their expertise spans finance, healthcare, and retail industries globally.',
        reviews: ['Great learning opportunities', 'Strong focus on backend technologies', 'Supportive management', 'Remote work options', 'Competitive retirement plans'],
        Culture: ['Fast-paced, tech-driven environment that values continuous learning and backend innovation.'],
        ContactInfo: ['email: info@backendinc.com', 'phone: 212-555-0100', 'address: 789 Broadway, New York, NY 10003']
    },
    {
        id: '4',
        name: 'DevOps Hub',
        location: 'Seattle, WA',
        description: 'DevOps Hub builds scalable DevOps infrastructure for enterprises, specializing in CI/CD pipelines, cloud management, and automation. They enhance operational efficiency and innovation in IT environments.',
        reviews: ['Collaborative teams', 'Advanced DevOps tools and practices', 'Work-from-home flexibility', 'Generous vacation policies', 'Focus on professional development'],
        Culture: ['Innovation-driven and collaborative environment that empowers employees to experiment with cutting-edge tools.'],
        ContactInfo: ['email: contact@devopshub.com', 'phone: 206-555-1234', 'address: 1234 Pine St, Seattle, WA 98101']
    },
    {
        id: '5',
        name: 'Tracking',
        location: 'Chicago, IL',
        description: 'Tracking is a logistics and supply chain management company that specializes in real-time tracking solutions for shipments, inventory management, and fleet management. Their cutting-edge technologies optimize logistics workflows for businesses worldwide.',
        reviews: ['Fast-paced and exciting projects', 'Focus on logistics innovation', 'Employee stock options', 'Comprehensive health insurance', 'Friendly and supportive coworkers'],
        Culture: ['A fast-moving and innovative company that emphasizes logistics efficiency and operational excellence.'],
        ContactInfo:['email: support@tracking.com','phone: 312-555-9876','address: 567 Wacker Dr, Chicago, IL 60601']
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