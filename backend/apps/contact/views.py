from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactMessageSerializer, ContactReceiptSerializer
from .services import create_contact_message
from .throttles import ContactRateThrottle


class ContactMessageView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_contact_message(**serializer.validated_data)
        receipt = ContactReceiptSerializer({"detail": "Your message has been received."})
        return Response(receipt.data, status=status.HTTP_201_CREATED)
