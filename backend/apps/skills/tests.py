from django.test import TestCase

from .models import SkillCategory


class SkillCategoryModelTests(TestCase):
    def test_slug_is_generated_from_name(self):
        category = SkillCategory.objects.create(name="Cloud Engineering")
        self.assertEqual(category.slug, "cloud-engineering")
