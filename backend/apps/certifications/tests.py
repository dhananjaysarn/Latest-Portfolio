from django.test import TestCase

from .models import Certification


class CertificationModelTests(TestCase):
    def test_certification_string_includes_issuer(self):
        certification = Certification.objects.create(name="Foundation", issuer="Example")
        self.assertEqual(str(certification), "Foundation — Example")
