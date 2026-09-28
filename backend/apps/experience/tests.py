from datetime import date

from django.test import TestCase

from .models import Experience


class ExperienceModelTests(TestCase):
    def test_experience_string_includes_organization(self):
        role = Experience.objects.create(
            role="Developer",
            organization="Example",
            start_date=date(2025, 1, 1),
        )
        self.assertEqual(str(role), "Developer at Example")
