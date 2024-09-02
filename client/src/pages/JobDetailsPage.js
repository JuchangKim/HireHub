import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
    const { id } = useParams();

    // Dummy data for job details
    const jobDetailsList = {
        1: {
            jobTitle: 'Software Engineer',
            company: 'Tech Corp',
            location: 'Auckland, New Zealand',
            jobType: 'Full-time',
            salary: '$90,000 - $110,000',
            description: `
                We are looking for a Software Engineer with a strong background in building scalable,
                high-quality, and high-performance software applications.
                You will be responsible for designing, developing, and implementing new features 
                and maintaining existing ones.
            `,
            responsibilities: `
                - Develop high-quality software design and architecture
                - Identify, prioritize, and execute tasks in the software development life cycle
                - Develop tools and applications by producing clean, efficient code
                - Automate tasks through appropriate tools and scripting
                - Review and debug code
                - Perform validation and verification testing
            `,
            requirements: `
                - Proven experience as a Software Engineer or similar role
                - Familiarity with Agile development methodologies
                - Experience with software design and development in a test-driven environment
                - Knowledge of coding languages (e.g. C++, Java, JavaScript) and frameworks/systems (e.g. AngularJS, Git)
                - Experience with databases and Object-Relational Mapping (ORM) frameworks (e.g. Hibernate)
                - Ability to learn new languages and technologies
                - Excellent communication skills
                - Resourcefulness and troubleshooting aptitude
                - Attention to detail
            `,
        },
        2: {
            jobTitle: 'Frontend Developer',
            company: 'Web Solutions',
            location: 'Wellington, New Zealand',
            jobType: 'Contract',
            salary: '$80,000 - $100,000',
            description: `
                We are seeking a Frontend Developer who is passionate about creating great user experiences.
                You will work closely with the design team to implement responsive, high-performance web applications.
            `,
            responsibilities: `
                - Implement responsive web designs using HTML, CSS, and JavaScript
                - Collaborate with UX/UI designers to create user-friendly interfaces
                - Optimize web pages for maximum speed and scalability
                - Ensure high-quality graphic standards and brand consistency
            `,
            requirements: `
                - Experience with front-end technologies such as HTML, CSS, JavaScript, and frameworks like React
                - Strong portfolio of previous work demonstrating expertise in frontend development
                - Good understanding of layout aesthetics
                - Familiarity with browser testing and debugging
            `,
        },
        3: {
            jobTitle: 'Backend Developer',
            company: 'Backend Inc.',
            location: 'Christchurch, New Zealand',
            jobType: 'Part-time',
            salary: '$70,000 - $90,000',
            description: `
                Backend Inc. is searching for a talented Backend Developer to join our team.
                You will be responsible for developing and managing our backend services and APIs.
            `,
            responsibilities: `
                - Develop and maintain scalable backend services and APIs
                - Work with front-end developers to integrate user-facing elements with server-side logic
                - Optimize applications for maximum speed and scalability
                - Implement security and data protection solutions
            `,
            requirements: `
                - Experience with backend technologies such as Node.js, Python, and databases like MongoDB
                - Understanding of front-end technologies is a plus
                - Familiarity with code versioning tools, such as Git
            `,
        },
        4: {
            jobTitle: 'Full Stack Developer',
            company: 'DevOps Hub',
            location: 'Hamilton, New Zealand',
            jobType: 'Full-time',
            salary: '$100,000 - $130,000',
            description: `
                DevOps Hub is looking for a Full Stack Developer to design and build our next-generation applications.
                You will be involved in all stages of software development from conception to deployment.
            `,
            responsibilities: `
                - Develop front-end website architecture and back-end website applications
                - Design user interactions on web pages
                - Develop and manage well-functioning databases and applications
                - Write effective APIs
            `,
            requirements: `
                - Experience with front-end technologies (e.g., HTML, JavaScript, CSS) and back-end technologies (e.g., Node.js, Python)
                - Strong organizational and project management skills
                - Ability to work independently and as part of a team
            `,
        },
    };

    const jobDetails = jobDetailsList[id];

    if (!jobDetails) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            <h1>{jobDetails.jobTitle}</h1>
            <h2>{jobDetails.company}</h2>
            <p><strong>Location:</strong> {jobDetails.location}</p>
            <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
            <p><strong>Salary:</strong> {jobDetails.salary}</p>
            <h3>Job Description</h3>
            <p>{jobDetails.description}</p>
            <h3>Responsibilities</h3>
            <p>{jobDetails.responsibilities}</p>
            <h3>Requirements</h3>
            <p>{jobDetails.requirements}</p>
        </div>
    );
};

export default JobDetailsPage;
