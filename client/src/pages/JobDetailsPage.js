// client/src/components/JobDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setJobDetails(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (!jobDetails) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            <h1>{jobDetails.title}</h1>
            <h2>{jobDetails.company}</h2>
            <p><strong>Location:</strong> {jobDetails.location}</p>
            <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
            {jobDetails.salary && <p><strong>Salary:</strong> ${jobDetails.salary}</p>}
            <h3>Job Description</h3>
            <p>{jobDetails.description}</p>
            {jobDetails.responsibilities && (
                <>
                    <h3>Responsibilities</h3>
                    <p>{jobDetails.responsibilities}</p>
                </>
            )}
            {jobDetails.requirements && (
                <>
                    <h3>Requirements</h3>
                    <p>{jobDetails.requirements}</p>
                </>
            )}
            {jobDetails.companyWebsite && (
                <p><strong>Company Website:</strong> <a href={jobDetails.companyWebsite} target="_blank" rel="noopener noreferrer">{jobDetails.companyWebsite}</a></p>
            )}
            {jobDetails.deadline && (
                <p><strong>Application Deadline:</strong> {jobDetails.deadline}</p>
            )}
        </div>
    );
};

export default JobDetailsPage;
