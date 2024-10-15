import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import BookmarksPriority from "./BookmarksPriority"; // Adjust the path as needed

function BookmarkPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State for modal
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedCategory, setSelectedCategory] = useState("All"); // Initial selected category
  const [appliedCategory, setAppliedCategory] = useState("All"); // Category that is applied
  const [categories, setCategories] = useState({}); // State to hold categories for each job

  useEffect(() => {
    // Fetch bookmarked jobs from local storage
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setBookmarkedJobs(storedBookmarks);

    // Load categories from local storage
    const storedCategories =
      JSON.parse(localStorage.getItem("jobCategories")) || {};
    setCategories(storedCategories);
  }, []);

  const removeBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job._id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
    // Also remove from categories
    const updatedCategories = { ...categories };
    delete updatedCategories[jobId];
    setCategories(updatedCategories);
    localStorage.setItem("jobCategories", JSON.stringify(updatedCategories));
  };

  const assignCategory = (jobId, category) => {
    const updatedCategories = { ...categories, [jobId]: category };
    setCategories(updatedCategories);
    localStorage.setItem("jobCategories", JSON.stringify(updatedCategories));
  };

  const applyFilter = (category) => {
    setAppliedCategory(category); // Set the applied category
  };

  const filteredJobs = bookmarkedJobs.filter((job) => {
    if (appliedCategory === "All") {
      return true; // Show all jobs
    }
    if (appliedCategory === "Uncategorized") {
      // Return jobs that have no assigned category (undefined or empty string)
      return !categories[job._id]; // No category assigned
    }
    // Return jobs that match the applied category
    return categories[job._id] === appliedCategory;
  });

  return (
    <Container fluid className="p-4">
      <BookmarksPriority
        selectedCategory={selectedCategory}
        onApplyFilter={applyFilter}
        onSelectCategory={setSelectedCategory} // Pass down function to update selected category
      />
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col xs={12} md={6} lg={4} key={job._id} className="mb-4">
              <Card
                className="job-card shadow-sm border-light"
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: "10px",
                }}
              >
                <Button
                  variant="danger"
                  onClick={() => removeBookmark(job._id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1,
                    borderRadius: "5px",
                  }}
                >
                  Remove Bookmark
                </Button>
                <Card.Body>
                  <Card.Title className="h5">{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {job.location}
                    <br />
                    <strong>Salary:</strong> {job.salary}
                    <br />
                    <strong>Description:</strong>{" "}
                    {job.description.substring(0, 100)}...
                  </Card.Text>

                  <Form.Control
                    as="select"
                    value={categories[job._id] || ""}
                    onChange={(e) => assignCategory(job._id, e.target.value)}
                    className="mb-2"
                  >
                    <option value="">Uncategorized</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Low Priority">Low Priority</option>
                  </Form.Control>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowModal(true);
                    }} // Open modal on click
                    className="me-2"
                    style={{ borderRadius: "5px" }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p>No bookmarked jobs.</p>
          </Col>
        )}
      </Row>

      {/* Modal for Job Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Company:</strong> {selectedJob?.company}
          <br />
          <strong>Location:</strong> {selectedJob?.location}
          <br />
          <strong>Salary:</strong> {selectedJob?.salary}
          <br />
          <strong>Description:</strong> {selectedJob?.description}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowModal(false)}
            style={{ borderRadius: "5px" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default BookmarkPage;
