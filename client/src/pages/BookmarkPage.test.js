// BookmarkPage.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BookmarkPage from "./BookmarkPage";

describe("BookmarkPage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("renders bookmarked jobs", () => {
    // Mock data for bookmarked jobs
    const mockedJobs = [
      {
        _id: "1",
        title: "Software Engineer",
        company: "Tech Corp",
        location: "Remote",
        salary: "$100,000",
        description: "A great job for a great engineer.",
      },
    ];

    // Set the mocked jobs in localStorage
    localStorage.setItem("bookmarkedJobs", JSON.stringify(mockedJobs));

    render(<BookmarkPage />);

    // Check if the job title is rendered
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  });

  test('removes bookmark when "Remove Bookmark" button is clicked', () => {
    const mockedJobs = [
      {
        _id: "1",
        title: "Software Engineer",
        company: "Tech Corp",
        location: "Remote",
        salary: "$100,000",
        description: "A great job for a great engineer.",
      },
    ];
    localStorage.setItem("bookmarkedJobs", JSON.stringify(mockedJobs));

    render(<BookmarkPage />);

    // Click the "Remove Bookmark" button
    fireEvent.click(screen.getByText(/remove bookmark/i));

    // Check if the "No bookmarked jobs." message is displayed
    expect(screen.getByText(/no bookmarked jobs/i)).toBeInTheDocument();
  });
});
