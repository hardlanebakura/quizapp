from django.shortcuts import render
from django.http import HttpResponse
from .models import Question, Answer
import random
from django.forms.models import model_to_dict
from rest_framework import serializers
from urllib.parse import urlparse, parse_qs
import json
from quiz.get_quiz_questions import api_question_to_db

import sys
import os

os.chdir("quiz/")

class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField()
    pub_date = serializers.DateTimeField()
    correct = serializers.CharField()

class AnswerSerializer(serializers.Serializer):
    text = serializers.CharField()

MONEY = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]

def index(request):
    return render(request, "quiz/index.html")

def question(request, id):
    if (id < 5): difficulty = "easy"
    elif id > 10: difficulty = "hard"
    else: difficulty = "medium"
    d = api_question_to_db()
    q, answers = d["q"], d["answers"]
    answers_json = [model_to_dict(item) for item in answers]
    q_json = json.dumps(QuestionSerializer(q).data)
    context = { "question": q, "question_json": q_json, "answers": answers, "answers_json": answers_json, "options": ["A", "B", "C", "D"], "round": id }
    return render(request, "quiz/question.html", context)

def money(request):
    query_string = parse_qs(request.META["QUERY_STRING"])
    correct_answers = query_string["correct_answers"][0] if "correct_answers" in query_string else 0
    context = { "prizes": MONEY, "answers": correct_answers }
    return render(request, "quiz/money.html", context)