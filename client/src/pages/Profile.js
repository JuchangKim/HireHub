import React, { useState, useEffect } from "react";
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

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [resumeError, setResumeError] = useState(""); // State to handle errors
  const [resumeURL, setResumeURL] = useState(""); // Store resume URL
  const [resumeSuccessMessage, setResumeSuccessMessage] = useState(""); // Success message for resume
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const navigate = useNavigate();

  useEffect(() => {
    // Load current user data from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName,
        username: currentUser.username,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        password: currentUser.password,
      });
      setResumeURL(currentUser.resume || ""); // Load resume URL if exists
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces
    const phoneRegex = /^[0-9]+$/; // Only digits

    if (!formData.fullName || !nameRegex.test(formData.fullName)) {
      errors.fullName = "Full Name must contain only alphabets and spaces.";
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain only digits.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Update user info
    const updatedUsers = existingUsers.map((user) =>
      user.username === formData.username
        ? { ...user, ...formData, resume: resumeURL }
        : user
    );

    try {
      // Save updated users list and set current user
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...formData, resume: resumeURL })
      );

      setMessage("Profile updated successfully!");
    } catch (e) {
      setMessage("Failed to update profile: Storage quota exceeded.");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (file.size > 5 * 1024 * 1024) {
        // Limit file size to 5MB
        setResumeError("File size exceeds 5MB.");
        return;
      }

      // Simulate uploading to a cloud storage and get URL
      // Replace this with actual upload logic
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
          // Simulate URL from cloud storage
          const resumeData = fileReader.result;
          setResumeURL(resumeData);
          setResumeError("");
          setResumeSuccessMessage("Resume uploaded successfully!"); // Set success message

          // Simulate saving to localStorage
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          const updatedUser = { ...currentUser, resume: resumeData };

          try {
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((user) =>
              user.username === currentUser.username ? updatedUser : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
          } catch (e) {
            setResumeError("Failed to save resume: Storage quota exceeded.");
          }
        };
      } catch (e) {
        setResumeError("Failed to read file.");
      }
    } else {
      setResumeError("Only PDF files are allowed.");
    }
  };

  const handleViewResume = () => {
    if (resumeURL) {
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe width="100%" height="100%" src="${resumeURL}"></iframe>`
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 p-4">
      <Card className="login-card p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
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
                isInvalid={!!formErrors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                readOnly
                className="mb-3"
                style={{ backgroundColor: "#e9ecef" }} // Greyed out field
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
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
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
                isInvalid={!!formErrors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phoneNumber}
              </Form.Control.Feedback>
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
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Upload Resume Section */}
            <Form.Group controlId="formResume">
              <Form.Label>Upload Resume (PDF Only)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="mb-3"
              />
              {resumeError && <Alert variant="danger">{resumeError}</Alert>}
              {resumeSuccessMessage && (
                <Alert variant="success">{resumeSuccessMessage}</Alert>
              )}
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Update Profile
                </Button>
              </Col>
              <Col>
                {resumeURL && (
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleViewResume}
                  >
                    View Resume
                  </Button>
                )}
              </Col>
            </Row>

            <Button variant="danger" className="w-100" onClick={handleLogout}>
              Logout
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
