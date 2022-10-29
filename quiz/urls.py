from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:id>", views.question, name="question"),
    path("money", views.money, name="money")
]