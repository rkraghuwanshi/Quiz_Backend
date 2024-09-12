from django.urls import path
from .views import join_quiz, submit_answer, leaderboard, get_quiz_questions

urlpatterns = [
    path('join-quiz/', join_quiz),
    path('submit-answer/', submit_answer),
    path('leaderboard/<str:quiz_code>/', leaderboard),
    path('quiz-questions/<str:quiz_code>/', get_quiz_questions),
]
