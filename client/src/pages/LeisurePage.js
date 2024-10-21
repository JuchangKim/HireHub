import React, { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const initialBoard = Array(9).fill(null);

const LeisurePage = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStats, setGameStats] = useState({ gamesPlayed: 0, xWins: 0, oWins: 0 });

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

    return squares.every((square) => square) ? "Draw" : null;
  };

  const handleUserMove = (index) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const result = checkWinner(newBoard);

    if (result) {
      handleGameOver(result);
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
        handleGameOver(result);
      }
    }
  };

  const handleGameOver = (result) => {
    setWinner(result);
    setIsGameOver(true);
    
    // Update the game stats
    setGameStats((prevStats) => ({
      gamesPlayed: prevStats.gamesPlayed + 1,
      xWins: result === "X" ? prevStats.xWins + 1 : prevStats.xWins,
      oWins: result === "O" ? prevStats.oWins + 1 : prevStats.oWins,
    }));
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsGameOver(false);
    setWinner(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
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
                        width: "120px",
                        height: "120px",
                        fontSize: "48px",
                        margin: "5px",
                        backgroundColor: "#f0f0f0",
                        transition: "background-color 0.3s",
                        color:
                          square === "X"
                            ? "#FF5733"
                            : square === "O"
                            ? "#007BFF"
                            : "black",
                        border:
                          square === "X"
                            ? "2px solid #FF5733"
                            : "2px solid #007BFF",
                      }}
                      onClick={() => handleUserMove(rowIndex * 3 + index)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#d0e7ff")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#f0f0f0")
                      }
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
        {/* Game Statistics Section */}
        <Col xs={12} md={4} lg={3} className="mt-3 mt-md-0">
          <div
            className="game-stats"
            style={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginLeft: "30px", // Spacing from the board
              marginTop: "70px", // Add vertical spacing to lower the statistics section
            }}
          >
            <h4 className="text-center">Game Statistics</h4>
            <hr />
            <p>
              <strong>Games Played:</strong> {gameStats.gamesPlayed}
            </p>
            <p>
              <strong>X Wins:</strong> {gameStats.xWins}
            </p>
            <p>
              <strong>O Wins:</strong> {gameStats.oWins}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LeisurePage;
