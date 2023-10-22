from django.urls import path
from django_api import views

urlpatterns = [
    path('project/', views.ProjectList.as_view()),
]