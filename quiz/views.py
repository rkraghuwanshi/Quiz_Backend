from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Quiz, UserScore, Question, User
from .serializers import QuizSerializer, UserScoreSerializer, QuestionSerializer

@api_view(['POST'])
def join_quiz(request):
    quiz_code = request.data.get('quiz_code')
    email = request.data.get('email')

    # Simulating user lookup or creation
    user, created = User.objects.get_or_create(email=email)

    # Check if the quiz exists
    quiz = Quiz.objects.filter(quiz_code=quiz_code).first()
    if not quiz:
        return Response({'error': 'Invalid quiz code'}, status=400)

    # Return the user ID and success message
    return Response({
        'message': 'Successfully joined the quiz',
        'user_id': user.id,
        'quiz_code': quiz.quiz_code
    })


@api_view(['POST'])
def submit_answer(request):
    user_id = request.data.get('user_id')
    quiz_code = request.data.get('quiz_code')
    question_id = request.data.get('question_id')
    user_answer = request.data.get('answer')
    
    user = User.objects.filter(id=user_id).first()
    quiz = Quiz.objects.filter(quiz_code=quiz_code).first()
    question = Question.objects.filter(id=question_id, quiz=quiz).first()

    if not user or not quiz or not question:
        return Response({'error': 'Invalid data provided'}, status=400)
    
    # Check if the answer is correct
    is_correct = user_answer.strip().lower() == question.correct_answer.strip().lower()

    # Create or update UserScore
    user_score, created = UserScore.objects.get_or_create(user=user, quiz=quiz)
    if is_correct:
        user_score.score += 10  # Increment score if the answer is correct
        user_score.save()

    return Response({
        'message': 'Answer submitted successfully',
        'correct': is_correct,
        'current_score': user_score.score
    })


@api_view(['GET'])
def leaderboard(request, quiz_code):
    quiz = Quiz.objects.filter(quiz_code=quiz_code).first()
    if not quiz:
        return Response({'error': 'Invalid quiz code'}, status=400)

    users_scores = UserScore.objects.filter(quiz=quiz).order_by('-score')
    leaderboard = [{'user': us.user.username, 'score': us.score} for us in users_scores]

    return Response({'leaderboard': leaderboard})

@api_view(['GET'])
def get_quiz_questions(request, quiz_code):
    quiz = Quiz.objects.filter(quiz_code=quiz_code).first()
    if not quiz:
        return Response({'error': 'Invalid quiz code'}, status=400)

    questions = quiz.questions.all()
    return Response(QuestionSerializer(questions, many=True).data)