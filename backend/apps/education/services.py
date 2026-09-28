from .models import Education


def get_current_education():
    return Education.objects.filter(is_current=True).order_by("-start_date")
