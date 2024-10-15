import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

function BookmarksPriority({
  selectedCategory,
  onApplyFilter,
  onSelectCategory,
}) {
  const uniqueCategories = [
    "All",
    "Uncategorized",
    "High Priority",
    "Low Priority",
  ];

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    onSelectCategory(selected); // Update selected category in parent component
  };

  return (
    <Row className="mb-4">
      <Col xs={6} className="d-flex align-items-center">
        <h3>Bookmarks</h3>
      </Col>
      <Col
        xs={6}
        className="text-end d-flex align-items-center justify-content-end"
      >
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={handleFilterChange}
          className="me-2"
          style={{ width: "200px" }} // Adjust width for dropdown
        >
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
        <Button
          variant="primary"
          onClick={() => onApplyFilter(selectedCategory)}
        >
          Apply Filter
        </Button>
      </Col>
    </Row>
  );
}

export default BookmarksPriority;
