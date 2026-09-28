from rest_framework import serializers

from .models import Profile, SocialLink


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ["label", "url", "platform", "order"]


class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            "display_name",
            "headline",
            "summary",
            "location",
            "email",
            "avatar_url",
            "resume_url",
            "social_links",
        ]
