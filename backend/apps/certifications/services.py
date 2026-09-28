from datetime import date

from .models import Certification


def get_current_certifications():
    return Certification.objects.exclude(expires_on__lt=date.today())
