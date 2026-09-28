from .models import Project


def get_public_projects():
    return Project.objects.filter(is_published=True).prefetch_related("technologies", "images").order_by("order", "-created_at")
