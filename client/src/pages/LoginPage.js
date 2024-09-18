import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage("All fields are required.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (user) {
      setMessage("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/my-profile");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 p-4">
      <Card className="login-card p-4">
        <Card.Body>
          {/* Add a styled div as a logo */}
          <div className="logo-container text-center mb-4">
            <h1 className="logo-text">HireHub</h1>
            <p className="logo-subtext">Connecting Talent with Opportunity</p>
          </div>
          <h2 className="text-center mb-4">Login</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
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

            <Row>
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleRegisterRedirect}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
