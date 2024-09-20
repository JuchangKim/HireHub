import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      localStorage.setItem("token", response.data.token); // Save token to local storage

      // Fetch user data
      const userResponse = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );
      localStorage.setItem("user", JSON.stringify(userResponse.data)); // Save user data to local storage

      setIsAuthenticated(true); // Update authentication status
      setSuccess("Login successful. Redirecting...");
      navigate("/profile"); // Redirect to profile page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={styles.card}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={styles.input}
              />
            </Form.Group>

            <div className="d-flex justify-content-center mb-3">
              <div style={styles.buttonContainer}>
                <Button variant="primary" type="submit" style={styles.button}>
                  Login
                </Button>
                <Link to="/signup" style={styles.link}>
                  <Button variant="primary" style={styles.button}>
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: "900px",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
  },
  input: {
    height: "50px",
    fontSize: "18px",
  },
  button: {
    width: "150px",
    padding: "10px",
    margin: "0 10px", // Add space between buttons
  },
  link: {
    textDecoration: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default LoginPage;
