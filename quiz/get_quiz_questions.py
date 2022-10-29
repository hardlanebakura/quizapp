import requests
import numpy as np
import html
import sys
import json

import os, django

sys.path.append('..')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_quiz.settings")
django.setup()
from quiz.models import Question, Answer

CATEGORIES = [i for i in range(9, 28)]

def get_quiz_questions(difficulty, category, amount=1, type="multiple"):
    d = {
        "difficulty": difficulty,
        "category": category,
        "amount": amount,
        "type": type
    }
    response = requests.post("http://localhost/django_quiz/quiz/api_questions.php", json=d)
    d = json.loads(response.text)["results"][0]
    for item in d:
        d[item] = html.unescape(d[item])
    return d

def api_question_to_db(difficulty="easy"):    
    d = get_quiz_questions(difficulty, str(np.random.choice(CATEGORIES)))
    d["correct"] = d.pop("correct_answer")
    d["answers"] = d.pop("incorrect_answers")
    d["answers"].append(d["correct"])
    q = Question(id=1, text = d["question"], correct = d["correct"])
    answers = list([Answer(id = 1, question = q, text = answer) for answer in d["answers"]])
    return {"q": q, "answers": answers}
    

api_question_to_db()