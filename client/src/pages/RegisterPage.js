import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Ensure this CSS file is properly created and imported

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const { fullName, phoneNumber } = formData;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d+$/;

    if (!nameRegex.test(fullName)) {
      setMessage("Full name can only contain alphabets.");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setMessage("Phone number can only contain digits.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      setMessage("All fields are required.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (existingUsers.some((user) => user.email === formData.email)) {
      setMessage("User with this email already exists.");
      return;
    }

    // Check if username already exists
    if (existingUsers.some((user) => user.username === formData.username)) {
      setMessage("User with this username already exists.");
      return;
    }

    // Save new user
    existingUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set the current user
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setMessage("User registered successfully!");

    // Clear the form
    setFormData({
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 p-4">
      <Card className="register-card p-4">
        <Card.Body>
          {/* Add a styled div as a logo */}
          <div className="logo-container text-center mb-4">
            <h1 className="logo-text">HireHub</h1>
            <p className="logo-subtext">Join the Network</p>
          </div>
          <h2 className="text-center mb-4">Register</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mb-4"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Register
            </Button>
            <Button
              variant="link"
              className="w-100 text-center"
              onClick={handleLoginRedirect}
            >
              Take me back to login page
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
