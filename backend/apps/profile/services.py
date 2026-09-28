from .models import Profile


def get_active_profile():
    return Profile.objects.filter(is_active=True).prefetch_related("social_links").order_by("created_at").first()
