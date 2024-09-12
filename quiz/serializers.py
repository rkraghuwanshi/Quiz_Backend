from rest_framework import serializers
from .models import Quiz, Question, UserScore

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['quiz_code', 'name']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text']

class UserScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserScore
        fields = ['user', 'quiz', 'score']
