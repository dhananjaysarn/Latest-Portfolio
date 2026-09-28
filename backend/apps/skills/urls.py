from rest_framework.routers import DefaultRouter

from .views import SkillCategoryViewSet

router = DefaultRouter()
router.register("", SkillCategoryViewSet, basename="skill-category")
urlpatterns = router.urls
