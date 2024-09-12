import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchLeaderboard,
  submitAnswer,
  getQuizQuestions,
} from "../services/api";
import { Button, Form, Row, Col, Container, Table } from "react-bootstrap";

function QuizRoom() {
  const { quizCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [userId] = useState(localStorage.getItem("userId")); // Assuming userId is stored in localStorage

  useEffect(() => {
    if (quizCode) {
      getQuizQuestions(quizCode)
        .then((response) => setQuestions(response.data))
        .catch((error) =>
          console.error("Error fetching quiz questions", error)
        );

      const interval = setInterval(() => {
        fetchLeaderboard(quizCode).then((response) => {
          setLeaderboard(response.data.leaderboard);
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [quizCode]);

  const handleInputChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleSubmit = (e, questionId) => {
    e.preventDefault();
    const answer = answers[questionId];

    submitAnswer(quizCode, questionId, answer, userId)
      .then((response) => {
        console.log("Answer submitted", response.data);
      })
      .catch((error) => console.error("Error submitting answer", error));
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2>Quiz Questions</h2>
          {questions.map((question) => (
            <Form
              key={question.id}
              onSubmit={(e) => handleSubmit(e, question.id)}
            >
              <Form.Group>
                <Form.Label>{question.question_text}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(e, question.id)}
                />
              </Form.Group>
              <Button type="submit">Submit Answer</Button>
            </Form>
          ))}
        </Col>

        <Col md={4}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default QuizRoom;
