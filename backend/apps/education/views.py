from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Education
from .serializers import EducationSerializer


class EducationViewSet(ReadOnlyModelViewSet):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()
