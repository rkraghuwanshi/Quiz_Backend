import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinQuiz } from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';

function JoinQuiz() {
    const [quizCode, setQuizCode] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        joinQuiz(quizCode, email)
            .then(response => {
                const { user_id, quiz_code } = response.data;
                
                // Save userId and quizCode to localStorage
                localStorage.setItem('userId', user_id);
                localStorage.setItem('quizCode', quiz_code);

                // Navigate to the quiz room
                navigate(`/quiz-room/${quiz_code}`);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.error || 'Error joining the quiz');
            });
    };

    return (
        <Container>
            <h2>Join a Quiz</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formQuizCode">
                    <Form.Label>Quiz Code</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter quiz code" 
                        value={quizCode} 
                        onChange={(e) => setQuizCode(e.target.value)} 
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </Form.Group>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <Button variant="primary" type="submit">
                    Join Quiz
                </Button>
            </Form>
        </Container>
    );
}

export default JoinQuiz;
