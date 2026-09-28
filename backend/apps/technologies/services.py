from .models import Technology


def get_technology_universe():
    return Technology.objects.order_by("category", "name")
