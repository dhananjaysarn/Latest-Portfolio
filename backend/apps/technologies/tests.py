from django.test import TestCase

from .models import Technology


class TechnologyModelTests(TestCase):
    def test_slug_is_generated_from_name(self):
        technology = Technology.objects.create(name="React Three Fiber")
        self.assertEqual(technology.slug, "react-three-fiber")
