from rest_framework import serializers

from apps.technologies.serializers import TechnologySerializer
from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["image_url", "alt_text", "caption", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    features = serializers.ListField(child=serializers.CharField(), read_only=True)

    class Meta:
        model = Project
        fields = [
            "title", "slug", "description", "problem", "solution", "features", "status",
            "technologies", "github_url", "live_url", "demo_url", "images", "featured",
        ]
