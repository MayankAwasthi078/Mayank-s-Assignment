from django.contrib import admin
from django_api.models import project
# Register your models here.
@admin.register(project)
class projct_admin(admin.ModelAdmin):
    list_display=['Project_Title']
