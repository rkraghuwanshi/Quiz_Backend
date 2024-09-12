import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/api";
import { Table, Container } from "react-bootstrap";

function Leaderboard({ quizCode }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // const interval = setInterval(() => {
    fetchLeaderboard(quizCode).then((response) => {
      setLeaderboard(response.data.leaderboard);
    });
    // }, ); // Polling every 5 seconds

    // return () => clearInterval(interval);
  }, [quizCode]);

  return (
    <Container>
      <h2>Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.user}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Leaderboard;
