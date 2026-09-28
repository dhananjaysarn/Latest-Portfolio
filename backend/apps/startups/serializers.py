from rest_framework import serializers

from .models import StartupIdea


class StartupIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupIdea
        fields = ["name", "slug", "summary", "problem", "proposed_solution", "stage", "website_url"]
