import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

function BookmarkPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State for modal
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Fetch bookmarked jobs from local storage
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setBookmarkedJobs(storedBookmarks);
  }, []);

  const removeBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job._id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        {bookmarkedJobs.length > 0 ? (
          bookmarkedJobs.map((job) => (
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
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(job)} // Open modal on click
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
      <Modal show={showModal} onHide={handleCloseModal}>
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
            onClick={handleCloseModal}
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
