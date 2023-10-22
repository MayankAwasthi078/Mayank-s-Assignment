from django.db import models

# Create your models here.

class project(models.Model):
    Project_Title= models.CharField(max_length=20)
    Project_Technologies= models.CharField(max_length=100,null=True, blank=True)
    Technical_Skillset_Frontend= models.CharField(max_length=100,null=True, blank=True)
    Technical_Skillset_Backend= models.CharField(max_length=100,null=True, blank=True)
    Technical_Skillset_Databases= models.CharField(max_length=100,null=True, blank=True)
    Technical_Skillset_Infrastructre= models.CharField(max_length=100,null=True, blank=True)
    Other_Information_Availability= models.CharField(max_length=100,null=True, blank=True)
