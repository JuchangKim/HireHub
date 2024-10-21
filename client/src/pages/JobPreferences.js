// obPreferences.js - This is job preferences card which is using in the profile page and register page.

import React from "react";
import { Form, Card } from "react-bootstrap";

const JobPreferences = ({ formData, handleChange }) => {
  return (
    <Card className="mb-4 p-3 border-primary">
      <Card.Body>
        <Card.Title>Job Preferences (Optional) </Card.Title>
        <Form.Group controlId="jobTitle" className="mb-3">
          <Form.Label>Preferred Job Title</Form.Label>
          <Form.Control
            type="text"
            name="jobTitle"
            value={formData.jobPreferences.jobTitle || ""}
            onChange={handleChange}
            placeholder="Enter preferred job title"
          />
        </Form.Group>

        <Form.Group controlId="location" className="mb-3">
          <Form.Label>Preferred Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.jobPreferences.location || ""}
            onChange={handleChange}
            placeholder="Enter preferred location"
          />
        </Form.Group>

        <Form.Group controlId="salary" className="mb-3">
          <Form.Label>Preferred Salary</Form.Label>
          <Form.Control
            as="select"
            name="salary"
            value={formData.jobPreferences.salary}
            onChange={handleChange}
          >
            <option value="">Select pay range</option>
            <option value="20-30k">20-30k</option>
            <option value="30-40k">30-40k</option>
            <option value="40-50k">40-50k</option>
            <option value="50-60k">50-60k</option>
            <option value="60-70k">60-70k</option>
            <option value="70-80k">70-80k</option>
            <option value="80-90k">80-90k</option>
            <option value="90-100k">90-100k</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="industry" className="mb-3">
          <Form.Label>Preferred Industry</Form.Label>
          <Form.Control
            type="text"
            name="industry"
            value={formData.jobPreferences.industry || ""}
            onChange={handleChange}
            placeholder="Enter preferred industry"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default JobPreferences;