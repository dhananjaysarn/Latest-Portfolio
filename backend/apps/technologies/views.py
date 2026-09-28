from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Technology
from .serializers import TechnologySerializer


class TechnologyViewSet(ReadOnlyModelViewSet):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()
    lookup_field = "slug"
