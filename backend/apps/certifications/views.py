from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Certification
from .serializers import CertificationSerializer


class CertificationViewSet(ReadOnlyModelViewSet):
    serializer_class = CertificationSerializer
    queryset = Certification.objects.all()
