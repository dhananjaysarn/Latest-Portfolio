from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import StartupIdea
from .serializers import StartupIdeaSerializer


class StartupIdeaViewSet(ReadOnlyModelViewSet):
    serializer_class = StartupIdeaSerializer
    queryset = StartupIdea.objects.filter(is_visible=True)
    lookup_field = "slug"
