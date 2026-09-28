from django.db import models
from django.utils.text import slugify

from common.models import TimestampedModel
from apps.technologies.models import Technology


class SkillCategory(TimestampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "skill categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Skill(TimestampedModel):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.PROTECT)
    technology = models.ForeignKey(Technology, null=True, blank=True, related_name="skills", on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    proficiency = models.PositiveSmallIntegerField(null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["category__order", "order", "name"]
        constraints = [
            models.UniqueConstraint(fields=["category", "name"], name="unique_skill_category_name"),
            models.CheckConstraint(condition=models.Q(proficiency__isnull=True) | models.Q(proficiency__lte=100), name="skill_proficiency_max_100"),
        ]

    def __str__(self) -> str:
        return self.name
