import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinQuiz from "./components/JoinQuiz";
import QuizRoom from "./components/QuizRoom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container>
        <h1>Real-Time Quiz Application</h1>
        <Routes>
          <Route path="/" element={<JoinQuiz />} />
          <Route path="/quiz-room/:quizCode" element={<QuizRoom />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
