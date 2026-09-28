from django.test import TestCase

from .models import Profile


class ProfileModelTests(TestCase):
    def test_profile_string_is_display_name(self):
        profile = Profile.objects.create(display_name="Dhananjay Rajan Sarnaik")
        self.assertEqual(str(profile), "Dhananjay Rajan Sarnaik")
