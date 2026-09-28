from rest_framework.routers import DefaultRouter

from .views import StartupIdeaViewSet

router = DefaultRouter()
router.register("", StartupIdeaViewSet, basename="startup")
urlpatterns = router.urls
