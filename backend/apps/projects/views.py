from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(is_published=True).prefetch_related("technologies", "images")
    lookup_field = "slug"
