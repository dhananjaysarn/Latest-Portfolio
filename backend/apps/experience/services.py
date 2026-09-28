from .models import Experience


def get_current_experience():
    return Experience.objects.filter(is_current=True).order_by("-start_date")
