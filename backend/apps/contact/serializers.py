from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message must not be blank.")
        return value.strip()


class ContactReceiptSerializer(serializers.Serializer):
    detail = serializers.CharField()
