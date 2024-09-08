import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
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
  const [resumeURL, setResumeURL] = useState(null); // Store resume URL
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
      setResumeURL(currentUser.resume || null); // Load resume URL if exists
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      setMessage("All fields are required.");
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

    // Save updated users list and set current user
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...formData, resume: resumeURL })
    );

    setMessage("Profile updated successfully!");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000); // 2000 ms = 2 seconds
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        const resumeData = fileReader.result;
        setResumeURL(resumeData);
        setResumeError("");

        // Update localStorage for the current user
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const updatedUser = { ...currentUser, resume: resumeData };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update the users array in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((user) =>
          user.username === currentUser.username ? updatedUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      };
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
              />
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
            </Form.Group>

            {resumeURL && (
              <Button
                variant="primary" // Use the same variant as "Update Profile"
                className="w-100 mb-3"
                onClick={handleViewResume}
              >
                View Uploaded Resume
              </Button>
            )}

            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
