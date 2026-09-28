from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceViewSet(ReadOnlyModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()
