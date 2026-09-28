from django.contrib import admin

from .models import Project, ProjectImage, ProjectTechnology


class ProjectTechnologyInline(admin.TabularInline):
    model = ProjectTechnology
    extra = 1
    autocomplete_fields = ["technology"]


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "is_published", "featured", "order", "updated_at"]
    list_filter = ["status", "is_published", "featured", "technologies__category"]
    search_fields = ["title", "description", "slug", "technologies__name"]
    ordering = ["order", "-created_at"]
    prepopulated_fields = {"slug": ["title"]}
    inlines = [ProjectTechnologyInline, ProjectImageInline]


@admin.register(ProjectTechnology)
class ProjectTechnologyAdmin(admin.ModelAdmin):
    list_display = ["project", "technology", "proficiency_note"]
    search_fields = ["project__title", "technology__name"]
    autocomplete_fields = ["project", "technology"]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ["project", "alt_text", "order"]
    search_fields = ["project__title", "alt_text"]
