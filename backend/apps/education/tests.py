from django.test import TestCase

from .models import Education


class EducationModelTests(TestCase):
    def test_education_string_includes_institution(self):
        education = Education.objects.create(institution="Institute", qualification="BSc")
        self.assertEqual(str(education), "BSc, Institute")
