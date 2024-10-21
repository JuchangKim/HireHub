// LeisurePage.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import LeisurePage from "./LeisurePage";

// Test 1: Check if the "Restart Game" button renders
test("renders restart button", () => {
  render(<LeisurePage />);
  const buttonElement = screen.getByText(/Restart Game/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test 2: Check if clicking on a square changes its content to X
test("clicking a square adds X", () => {
  render(<LeisurePage />);
  const buttons = screen.getAllByRole("button", { name: "" }); // Select only the square buttons
  fireEvent.click(buttons[0]);
  expect(buttons[0].textContent).toBe("X");
});

// Test 3: Check if the computer plays O after the player
test("computer moves after player", async () => {
  render(<LeisurePage />);
  const buttons = screen.getAllByRole("button", { name: "" });

  fireEvent.click(buttons[0]); // Player move
  // The computer may not always choose buttons[1] based on the random logic, so we find a square with 'O'
  const computerMove = await screen.findByText("O", {}, { timeout: 500 });
  expect(computerMove).toBeInTheDocument();
});

// Test 4: Check if the game announces a winner
test("announces winner", () => {
  render(<LeisurePage />);
  const buttons = screen.getAllByRole("button", { name: "" });

  // Simulate a winning game for X
  fireEvent.click(buttons[0]); // X
  fireEvent.click(buttons[1]); // Computer O
  fireEvent.click(buttons[3]); // X
  fireEvent.click(buttons[4]); // Computer O
  fireEvent.click(buttons[6]); // X wins

  const winnerMessage = screen.getByText(/Winner: X/i);
  expect(winnerMessage).toBeInTheDocument();
});
