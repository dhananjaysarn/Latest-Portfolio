from rest_framework import serializers

from .models import Skill, SkillCategory


class SkillSerializer(serializers.ModelSerializer):
    technology = serializers.SlugRelatedField(read_only=True, slug_field="slug")

    class Meta:
        model = Skill
        fields = ["name", "technology", "proficiency", "order"]


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ["name", "slug", "order", "skills"]
