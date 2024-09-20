import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import './CompyProfilePage.css';  // Optional: For any custom CSS

const companiesData = [
    {
        id: 1,
        name: 'Xero',
        phone: '04-901-5050',
        email: 'info@xero.com',
        location: 'Level 1, 20 Customhouse Quay, Wellington',
        background: 'Xero is a New Zealand-based software company that develops cloud-based accounting software.',
        mission: 'To make life better for small businesses.',
        benefits: 'Health insurance, Flexible working hours, Employee stock options.',
        culture: 'Xero promotes a culture of inclusivity and innovation.',
        testimonials: [
            '“Xero is a great place for growth!” - Jane Smith, Software Engineer',
            '“The team spirit here is unbeatable.” - John Doe, Customer Support'
        ],
        image: 'https://www.a2xaccounting.com/img/content/xero.jpg',
        video: 'https://www.youtube.com/embed/QwmGlkomnLs' 
    },
    {
        id: 2,
        name: 'Fisher & Paykel Healthcare',
        phone: '09-574-0100',
        email: 'info@fphcare.co.nz',
        location: '15 Maurice Paykel Place, East Tamaki, Auckland',
        background: 'Fisher & Paykel Healthcare is a leader in the design and manufacture of innovative products for respiratory care.',
        mission: 'To improve the lives of patients worldwide.',
        benefits: 'Paid parental leave, Health and wellness programs, Professional development opportunities.',
        culture: 'We embrace diversity and encourage employee growth.',
        testimonials: [
            '“The innovation here is inspiring!” - Alice Brown, Product Manager',
            '“A supportive and dynamic workplace.” - Mark Wilson, R&D Specialist'
        ],
        image: 'https://connect-assets.prosple.com/cdn/ff/rIVrNCdceKs6-Sc-TVF6E8U9Zt_jcpQfKqYxbGRJ19w/1715665898/public/styles/scale_and_crop_center_890x320/public/2024-05/Banner%20%2831%29.jpg?itok=Mqn7-aHx',
        video: 'https://www.youtube.com/embed/6Tfg_Puj-jI'
    },
    {
        id: 3,
        name: 'Air New Zealand',
        phone: '0800 737 000',
        email: 'customer.service@airnz.co.nz',
        location: 'Private Bag 92007, Auckland Airport, Auckland',
        background: 'Air New Zealand is the national airline and flag carrier of New Zealand.',
        mission: 'To be New Zealand’s most loved airline.',
        benefits: 'Travel discounts, Health insurance, Employee recognition programs.',
        culture: 'We focus on safety and customer service while fostering a friendly work environment.',
        testimonials: [
            '“Flying with Air New Zealand feels like home!” - Sarah Johnson, Cabin Crew',
            '“Fantastic team and amazing experiences!” - Tom Green, Pilot'
        ],
        image: 'https://flywith.virginatlantic.com/content/dam/HelpCentre/banner-air-new-zealand.jpg.transform/1280x708/image.jpg',
        video: 'https://www.youtube.com/embed/X84SuT5gAV0' 
    },
    {
        id: 4,
        name: 'Rocket Lab',
        phone: '0800 762 538',
        email: 'info@rocketlabusa.com',
        location: '13 Seddon Street, Mt Wellington, Auckland',
        background: 'Rocket Lab is a private American aerospace manufacturer and small satellite launch service.',
        mission: 'To open access to space for small satellites.',
        benefits: 'Comprehensive health benefits, Team outings, Career development opportunities.',
        culture: 'Rocket Lab fosters a culture of innovation and collaboration.',
        testimonials: [
            '“Working at Rocket Lab is a dream come true for any space enthusiast!” - Lisa White, Mission Manager',
            '“The environment here is fast-paced and inspiring.” - David Brown, Engineer'
        ],
        image: 'https://gohireher.com/wp-content/uploads/2023/08/RL_Logo_2022_-_Twitter_Banner_1-1692067200-1140x400.jpg',
        video: 'https://www.youtube.com/embed/PKVaOht_stI' 
    }
];

function CompyProfilePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCompanies = companiesData.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Company Profiles</h2>
            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search for companies..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '500px', margin: '0 auto' }}
                    />
                </Form.Group>
            </Form>

            {filteredCompanies.length > 0 ? (
                <Row>
                    {filteredCompanies.map(company => (
                        <Col md={6} key={company.id} className="mb-4 d-flex align-items-stretch">
                            <Card className="w-100">
                                <Card.Img variant="top" src={company.image} />
                                <Card.Body>
                                    <Card.Title className="mb-3">{company.name}</Card.Title>
                                    <Card.Text>
                                       
                                            <strong>Contact Information:</strong>
                                            <br />
                                                Phone: {company.phone}<br />
                                                Email: {company.email}<br />
                                                Location: {company.location}
                                            
                                    </Card.Text>
                                    <Card.Text>
                                        
                                        <strong>Background:</strong><br />
                                        {company.background}<br /><br />
                                        
                                        <strong>Mission:</strong><br /> 
                                        {company.mission}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Employee Benefits:</strong><br />
                                        {company.benefits}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Company Culture:</strong><br />
                                        {company.culture}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Testimonials:</strong><br />
                                        {company.testimonials.map((test, index) => (
                                            <p key={index} style={{ marginBottom: '0.5rem' }}>{test}</p>
                                        ))}
                                    </Card.Text>
                                    {company.video && (
                                        <div className="mt-3">
                                            <strong>Watch our video:</strong>
                                            <iframe
                                                width="100%"
                                                height="200"
                                                src={company.video}
                                                title={`Video about ${company.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning">No companies found matching your search.</Alert>
            )}
        </Container>
    );
}

export default CompyProfilePage;