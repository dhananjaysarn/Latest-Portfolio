from django.test import TestCase
from rest_framework.test import APIClient

from .models import ContactMessage


class ContactMessageModelTests(TestCase):
    def test_message_is_unread_by_default(self):
        message = ContactMessage.objects.create(
            name="Visitor",
            email="visitor@example.com",
            subject="Hello",
            message="A message.",
        )
        self.assertFalse(message.is_read)


class ContactApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_valid_submission_is_stored_and_returns_created(self):
        response = self.client.post(
            "/api/v1/contact/",
            {
                "name": "Visitor",
                "email": "visitor@example.com",
                "subject": "Hello",
                "message": "A message.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(response.data["detail"], "Your message has been received.")

    def test_invalid_submission_returns_field_errors(self):
        response = self.client.post(
            "/api/v1/contact/",
            {"name": "Visitor", "email": "invalid", "subject": "", "message": "  "},
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data)
        self.assertIn("message", response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)
