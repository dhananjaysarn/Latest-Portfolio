from django.contrib import admin

from .models import Education


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["qualification", "institution", "start_date", "end_date", "is_current"]
    list_filter = ["is_current", "institution"]
    search_fields = ["qualification", "institution", "field_of_study"]
    ordering = ["-end_date", "-start_date"]
