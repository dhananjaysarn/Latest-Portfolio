from django.db import models
from django.utils.text import slugify

from common.models import TimestampedModel


class Technology(TimestampedModel):
    class Category(models.TextChoices):
        FRONTEND = "frontend", "Frontend"
        BACKEND = "backend", "Backend"
        DATABASE = "database", "Database"
        CLOUD = "cloud", "Cloud"
        TOOLING = "tooling", "Tooling"
        OTHER = "other", "Other"

    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    category = models.CharField(max_length=16, choices=Category.choices, default=Category.OTHER, db_index=True)
    icon_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ["category", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
