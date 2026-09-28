from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import SkillCategory
from .serializers import SkillCategorySerializer


class SkillCategoryViewSet(ReadOnlyModelViewSet):
    serializer_class = SkillCategorySerializer
    queryset = SkillCategory.objects.prefetch_related("skills__technology").all()
    lookup_field = "slug"
