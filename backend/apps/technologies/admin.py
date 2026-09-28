from django.contrib import admin

from .models import Technology


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "slug", "updated_at"]
    list_filter = ["category"]
    search_fields = ["name", "slug"]
    ordering = ["category", "name"]
    prepopulated_fields = {"slug": ["name"]}
