from .models import project
from .serializers import ProjectSerializer
from rest_framework.generics import ListAPIView
from rest_framework import filters
from rest_framework import generics
# Create your views here.
class ProjectList(generics.ListAPIView):
  queryset = project.objects.all()
  serializer_class = ProjectSerializer
  filter_backends = [filters.SearchFilter]
  search_fields = ['Project_Title']

 