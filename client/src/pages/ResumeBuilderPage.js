import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ResumeBuilderPage() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    education: [""],
    experience: [""],
    skills: [""],
    references: [""],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    setFormData({ ...formData, phone: value });
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, ""],
    }));
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, ""],
    }));
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addReference = () => {
    setFormData((prevData) => ({
      ...prevData,
      references: [...prevData.references, ""],
    }));
  };

  const handleReferenceChange = (index, value) => {
    const updatedReferences = [...formData.references];
    updatedReferences[index] = value;
    setFormData({ ...formData, references: updatedReferences });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(formData.name, 14, 22);

    // Contact Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const contactInfo = `${formData.email} | ${formData.phone}`;
    doc.text(contactInfo, 14, 32);
    doc.line(10, 35, 200, 35); // Line below contact info

    // Function to add a section with title and content
    const addSection = (title, content, startY, extraSpacing = 0) => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(title, 14, startY);
      doc.line(14, startY + 3, 200, startY + 3); // Underline for section title
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      const itemStartY = startY + 8 + extraSpacing; // Start position after title, with optional extra spacing
      content.forEach((item, index) => {
        if (item) {
          doc.text(`• ${item}`, 14, itemStartY + index * 6);
        }
      });
      doc.line(
        10,
        itemStartY + (content.length + 1) * 6,
        200,
        itemStartY + (content.length + 1) * 6
      ); // Line below section
    };

    // Adding Sections
    addSection("Education", formData.education, 50);
    addSection("Experience", formData.experience, 90);
    addSection("Skills", formData.skills, 130);
    addSection("References", formData.references, 170, 5); // Extra spacing for "References"

    // Adding Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated by HireHub Resume Builder", 14, 280);
    doc.setLineWidth(0.1);
    doc.line(10, 275, 200, 275); // Footer line

    // Save PDF
    doc.save(`${formData.name}_Resume.pdf`);
    setSuccess("Your resume has been generated!");
    setFormData(initialFormData);

    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <Container
      className="mt-5"
      style={{ position: "relative", paddingBottom: "60px" }}
    >
      <h2>Create Your Resume</h2>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            required
          />
        </Form.Group>

        <Form.Label>Education</Form.Label>
        {formData.education.map((edu, index) => (
          <Form.Group
            controlId={`formEducation${index}`}
            className="mb-3"
            key={index}
          >
            <Form.Control
              type="text"
              value={edu}
              onChange={(e) => handleEducationChange(index, e.target.value)}
              placeholder="Enter your education"
              required
            />
          </Form.Group>
        ))}
        <div
          className="d-flex align-items-center mb-4"
          style={{ justifyContent: "flex-end" }}
        >
          <Button variant="primary" onClick={addEducation}>
            + Add Education
          </Button>
        </div>

        <Form.Label>Experience</Form.Label>
        {formData.experience.map((exp, index) => (
          <Form.Group
            controlId={`formExperience${index}`}
            className="mb-3"
            key={index}
          >
            <Form.Control
              type="text"
              value={exp}
              onChange={(e) => handleExperienceChange(index, e.target.value)}
              placeholder="Enter your experience"
              required
            />
          </Form.Group>
        ))}
        <div
          className="d-flex align-items-center mb-4"
          style={{ justifyContent: "flex-end" }}
        >
          <Button variant="primary" onClick={addExperience}>
            + Add Experience
          </Button>
        </div>

        <Form.Label>Skills</Form.Label>
        {formData.skills.map((skill, index) => (
          <Form.Group
            controlId={`formSkill${index}`}
            className="mb-3"
            key={index}
          >
            <Form.Control
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Enter your skill"
              required
            />
          </Form.Group>
        ))}
        <div
          className="d-flex align-items-center mb-4"
          style={{ justifyContent: "flex-end" }}
        >
          <Button variant="primary" onClick={addSkill}>
            + Add Skill
          </Button>
        </div>

        <Form.Label>References</Form.Label>
        {formData.references.map((ref, index) => (
          <Form.Group
            controlId={`formReference${index}`}
            className="mb-3"
            key={index}
          >
            <Form.Control
              type="text"
              value={ref}
              onChange={(e) => handleReferenceChange(index, e.target.value)}
              placeholder="Enter your reference"
              required
            />
          </Form.Group>
        ))}
        <div
          className="d-flex align-items-center mb-4"
          style={{ justifyContent: "flex-end" }}
        >
          <Button variant="primary" onClick={addReference}>
            + Add Reference
          </Button>
        </div>

        <Button variant="success" type="submit">
          Generate PDF
        </Button>
      </Form>
    </Container>
  );
}

export default ResumeBuilderPage;
