from django.db import models
from django.utils.text import slugify

from common.models import TimestampedModel


class StartupIdea(TimestampedModel):
    class Stage(models.TextChoices):
        CONCEPT = "concept", "Concept"
        PROTOTYPE = "prototype", "Prototype"
        IN_DEVELOPMENT = "in_development", "In development"
        DEPLOYED = "deployed", "Deployed"

    name = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    summary = models.CharField(max_length=300)
    problem = models.TextField(blank=True)
    proposed_solution = models.TextField(blank=True)
    stage = models.CharField(max_length=20, choices=Stage.choices, default=Stage.CONCEPT, db_index=True)
    website_url = models.URLField(blank=True, null=True)
    is_visible = models.BooleanField(default=False, db_index=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.name} ({self.get_stage_display()})"
