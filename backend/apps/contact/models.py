from django.db import models

from common.models import TimestampedModel


class ContactMessage(TimestampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=180)
    message = models.TextField(max_length=5000)
    is_read = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["is_read", "-created_at"], name="contact_read_created_idx")]

    def __str__(self) -> str:
        return f"{self.subject} — {self.name}"
