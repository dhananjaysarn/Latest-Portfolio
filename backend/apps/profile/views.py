from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Profile, SocialLink
from .serializers import ProfileSerializer, SocialLinkSerializer


class ProfileView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.filter(is_active=True).prefetch_related("social_links")

    def get_object(self):
        return get_object_or_404(self.get_queryset().order_by("created_at"))


class SocialLinkViewSet(ReadOnlyModelViewSet):
    serializer_class = SocialLinkSerializer
    queryset = SocialLink.objects.filter(profile__is_active=True).select_related("profile")
