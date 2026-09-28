from .models import StartupIdea


def get_public_startup_ideas():
    return StartupIdea.objects.filter(is_visible=True).order_by("order", "name")
