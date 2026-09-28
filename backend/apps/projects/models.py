from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify

from common.models import TimestampedModel
from apps.technologies.models import Technology


def validate_string_list(value):
    if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
        raise ValidationError("Features must be a list of strings.")


class Project(TimestampedModel):
    class Status(models.TextChoices):
        CONCEPT = "concept", "Concept"
        IN_PROGRESS = "in_progress", "In progress"
        DEPLOYED = "deployed", "Deployed"
        ARCHIVED = "archived", "Archived"

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    description = models.TextField()
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True, validators=[validate_string_list])
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.CONCEPT, db_index=True)
    technologies = models.ManyToManyField(Technology, through="ProjectTechnology", related_name="projects")
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    is_published = models.BooleanField(default=False, db_index=True)
    featured = models.BooleanField(default=False, db_index=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]
        indexes = [models.Index(fields=["featured", "status"], name="project_featured_status_idx")]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class ProjectTechnology(TimestampedModel):
    project = models.ForeignKey(Project, related_name="technology_links", on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, related_name="project_links", on_delete=models.PROTECT)
    proficiency_note = models.CharField(max_length=160, blank=True)

    class Meta:
        ordering = ["project__order", "technology__name"]
        constraints = [
            models.UniqueConstraint(fields=["project", "technology"], name="unique_project_technology"),
        ]

    def __str__(self) -> str:
        return f"{self.project}: {self.technology}"


class ProjectImage(TimestampedModel):
    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image_url = models.URLField()
    alt_text = models.CharField(max_length=240)
    caption = models.CharField(max_length=240, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self) -> str:
        return f"{self.project}: image {self.order}"
