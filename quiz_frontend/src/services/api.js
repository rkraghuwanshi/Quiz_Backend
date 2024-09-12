import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const joinQuiz = (quizCode, email) => {
  return axios.post(`${API_BASE_URL}/join-quiz/`, {
    quiz_code: quizCode,
    email: email,
  });
};

export const submitAnswer = (quizCode, questionId, answer, userId) => {
    return axios.post(`${API_BASE_URL}/submit-answer/`, {
        quiz_code: quizCode,
        question_id: questionId,
        answer,
        user_id: userId  // Send userId along with the request
    });
};

export const fetchLeaderboard = (quizCode) => {
  return axios.get(`${API_BASE_URL}/leaderboard/${quizCode}/`);
};

export const getQuizQuestions = (quizCode) => {
  return axios.get(`${API_BASE_URL}/quiz-questions/${quizCode}/`);
};
