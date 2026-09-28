from .models import SkillCategory


def get_skill_categories():
    return SkillCategory.objects.prefetch_related("skills__technology").order_by("order", "name")
