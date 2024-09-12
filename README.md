Real-Time Quiz Platform
This is a real-time quiz platform built using Django (Backend) and ReactJS (Frontend). The system allows users to join quizzes, answer questions, and see real-time leaderboard updates.

Prerequisites
Python 3.x
Node.js & npm
Git

Installation Guide

1. Clone the Repository

   > > git clone <your-repo-url>
   > > cd <your-project-directory>

2. Backend Setup (Django)
   Create a Virtual Environment:

> > python3 -m venv venv
> > source venv/bin/activate # For Linux/macOS
> > venv\Scripts\activate # For Windows

Install Dependencies:

> > pip install -r requirements.txt

Run Migrations:

> > python manage.py makemigrations
> > python manage.py migrate

Create a Superuser (for admin access):
python manage.py createsuperuser

Run the Development Server:

> > python manage.py runserver

3. Frontend Setup (ReactJS)
   Navigate to the Frontend Directory:
   > > cd frontend

Install Node Modules:

> > npm install

Start the React Development Server:

> > npm start

Running the Application
Open your browser and visit the Django backend at:
http://127.0.0.1:8000
The React frontend will be running at:

http://localhost:3000

Features
Join a quiz using a unique quiz code.
Submit answers and view real-time score updates.
See real-time leaderboard standings.
API Endpoints
POST /join-quiz/: Join a quiz by submitting the quiz code and email.
GET /quiz-questions/: Retrieve questions for a specific quiz.
POST /submit-answer/: Submit answers to the quiz.
GET /leaderboard/: Fetch the leaderboard for the quiz.
