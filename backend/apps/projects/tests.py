from django.core.exceptions import ValidationError
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Project


class ProjectModelTests(TestCase):
    def test_slug_is_generated_from_title(self):
        project = Project.objects.create(title="Portfolio API", description="A description.")
        self.assertEqual(project.slug, "portfolio-api")

    def test_features_reject_non_string_lists(self):
        project = Project(
            title="Portfolio API",
            description="A description.",
            features={"feature": True},
        )
        with self.assertRaises(ValidationError):
            project.full_clean()


class ProjectApiTests(TestCase):
    def test_project_collection_uses_serialized_api_data(self):
        Project.objects.create(title="Portfolio API", description="A description.", is_published=True)
        response = APIClient().get("/api/v1/projects/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["slug"], "portfolio-api")
        self.assertEqual(response.data["results"][0]["technologies"], [])
