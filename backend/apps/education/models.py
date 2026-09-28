from django.db import models

from common.models import TimestampedModel


class Education(TimestampedModel):
    institution = models.CharField(max_length=180)
    qualification = models.CharField(max_length=180)
    field_of_study = models.CharField(max_length=180, blank=True)
    location = models.CharField(max_length=160, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["-end_date", "-start_date", "order"]
        constraints = [
            models.CheckConstraint(condition=models.Q(end_date__isnull=True) | models.Q(start_date__isnull=True) | models.Q(end_date__gte=models.F("start_date")), name="education_end_after_start"),
            models.CheckConstraint(condition=~models.Q(is_current=True, end_date__isnull=False), name="current_education_without_end"),
        ]

    def __str__(self) -> str:
        return f"{self.qualification}, {self.institution}"
