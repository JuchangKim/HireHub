import React, { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const initialBoard = Array(9).fill(null);

const LeisurePage = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return squares.every((square) => square) ? "Draw" : null; // Check for draw
  };

  const handleUserMove = (index) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const result = checkWinner(newBoard);

    if (result) {
      setWinner(result);
      setIsGameOver(true);
      return;
    }

    computerMove(newBoard);
  };

  const computerMove = (newBoard) => {
    const availableMoves = newBoard
      .map((val, index) => (val === null ? index : null))
      .filter((val) => val !== null);
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      newBoard[availableMoves[randomIndex]] = "O";
      setBoard(newBoard);
      const result = checkWinner(newBoard);

      if (result) {
        setWinner(result);
        setIsGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsGameOver(false);
    setWinner(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Tic Tac Toe</h2>
          {winner && (
            <Alert variant={winner === "Draw" ? "warning" : "success"}>
              {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                {board
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((square, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      style={{
                        width: "120px", // Increased button size
                        height: "120px", // Increased button size
                        fontSize: "48px", // Increased font size
                        margin: "5px",
                        backgroundColor: "#f0f0f0",
                        transition: "background-color 0.3s", // Added transition for hover effect
                        color:
                          square === "X"
                            ? "#FF5733"
                            : square === "O"
                            ? "#007BFF"
                            : "black", // Different colors for X and O
                        border:
                          square === "X"
                            ? "2px solid #FF5733"
                            : square === "O"
                            ? "2px solid #007BFF"
                            : "2px solid #007BFF",
                      }}
                      onClick={() => handleUserMove(rowIndex * 3 + index)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#d0e7ff")
                      } // Hover effect
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#f0f0f0")
                      } // Reset hover effect
                    >
                      {square}
                    </Button>
                  ))}
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            className="w-100"
            style={{ fontSize: "24px" }}
            onClick={resetGame}
          >
            Restart Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LeisurePage;
