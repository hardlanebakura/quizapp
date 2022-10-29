from django.db import models
from django.utils import timezone

# Create your models here.
class Question(models.Model):

    text = models.CharField(max_length = 400)
    pub_date = models.DateTimeField('date published', default = timezone.now())
    answers = models.CharField(max_length = 400, default = "")
    correct = models.CharField(max_length = 400, default = "")
    
    def __str__(self) -> str:
        return self.text

    @classmethod
    def get_answers(self) -> str:
        return [item for item in Answer.objects.filter(question__id = self.id)]

    class Meta:
        app_label = "quiz"

class Answer(models.Model):
    text = models.CharField(max_length = 400)
    question = models.ForeignKey(Question, on_delete = models.CASCADE)

    def __str__(self) -> str:
        return self.text

    class Meta:
        app_label = "quiz"
