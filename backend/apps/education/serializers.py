from rest_framework import serializers

from .models import Education


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            "institution", "qualification", "field_of_study", "location",
            "start_date", "end_date", "is_current", "description",
        ]
