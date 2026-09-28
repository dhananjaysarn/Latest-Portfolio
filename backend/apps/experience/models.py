from django.db import models

from common.models import TimestampedModel


class Experience(TimestampedModel):
    role = models.CharField(max_length=160)
    organization = models.CharField(max_length=160)
    location = models.CharField(max_length=160, blank=True)
    organization_url = models.URLField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    highlights = models.JSONField(default=list, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["-start_date", "order"]
        constraints = [
            models.CheckConstraint(condition=models.Q(end_date__isnull=True) | models.Q(end_date__gte=models.F("start_date")), name="experience_end_after_start"),
            models.CheckConstraint(condition=~models.Q(is_current=True, end_date__isnull=False), name="current_experience_without_end"),
        ]
        indexes = [models.Index(fields=["-start_date"], name="experience_start_desc_idx")]

    def __str__(self) -> str:
        return f"{self.role} at {self.organization}"
