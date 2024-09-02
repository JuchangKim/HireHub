import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationPage = () => {
    // Dummy data for applications
    const applications = [
        {
            id: 1,
            jobTitle: 'Software Engineer',
            company: 'Tech Corp',
            status: 'Pending',
            dateApplied: '2024-08-25',
        },
        {
            id: 2,
            jobTitle: 'Frontend Developer',
            company: 'Web Solutions',
            status: 'Interview Scheduled',
            dateApplied: '2024-08-20',
        },
        {
            id: 3,
            jobTitle: 'Backend Developer',
            company: 'Backend Inc.',
            status: 'Rejected',
            dateApplied: '2024-07-15',
        },
        {
            id: 4,
            jobTitle: 'Full Stack Developer',
            company: 'DevOps Hub',
            status: 'Offer Received',
            dateApplied: '2024-08-10',
        },
    ];

    return (
        <div>
            <h1>My Applications</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Date Applied</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.jobTitle}</td>
                            <td>{application.company}</td>
                            <td>{application.status}</td>
                            <td>{application.dateApplied}</td>
                            <td>
                                <Link to={`/job/${application.id}`}>View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationPage;
