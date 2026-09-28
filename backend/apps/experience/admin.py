from django.contrib import admin

from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["role", "organization", "start_date", "end_date", "is_current"]
    list_filter = ["is_current", "organization"]
    search_fields = ["role", "organization", "description"]
    ordering = ["-start_date"]
