from django.contrib import admin

from .models import StartupIdea


@admin.register(StartupIdea)
class StartupIdeaAdmin(admin.ModelAdmin):
    list_display = ["name", "stage", "is_visible", "order", "updated_at"]
    list_filter = ["stage", "is_visible"]
    search_fields = ["name", "slug", "summary"]
    ordering = ["order", "name"]
    prepopulated_fields = {"slug": ["name"]}
