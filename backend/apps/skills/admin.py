from django.contrib import admin

from .models import Skill, SkillCategory


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0
    autocomplete_fields = ["technology"]


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "order"]
    search_fields = ["name"]
    ordering = ["order", "name"]
    prepopulated_fields = {"slug": ["name"]}
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "technology", "proficiency", "order"]
    list_filter = ["category"]
    search_fields = ["name", "category__name", "technology__name"]
    autocomplete_fields = ["category", "technology"]
