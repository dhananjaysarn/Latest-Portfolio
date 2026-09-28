from rest_framework import serializers

from .models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["name", "issuer", "credential_id", "credential_url", "issued_on", "expires_on"]
