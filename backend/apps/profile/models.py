from django.db import models

from common.models import TimestampedModel


class Profile(TimestampedModel):
    display_name = models.CharField(max_length=160)
    headline = models.CharField(max_length=240, blank=True)
    summary = models.TextField(blank=True)
    location = models.CharField(max_length=160, blank=True)
    email = models.EmailField(blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    resume_url = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ["display_name"]
        verbose_name_plural = "profiles"
        constraints = [
            models.UniqueConstraint(
                fields=["is_active"],
                condition=models.Q(is_active=True),
                name="unique_active_profile",
            ),
        ]

    def __str__(self) -> str:
        return self.display_name


class SocialLink(TimestampedModel):
    profile = models.ForeignKey(Profile, related_name="social_links", on_delete=models.CASCADE)
    label = models.CharField(max_length=80)
    url = models.URLField()
    platform = models.CharField(max_length=40)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "label"]
        constraints = [
            models.UniqueConstraint(fields=["profile", "platform"], name="unique_profile_social_platform"),
        ]

    def __str__(self) -> str:
        return f"{self.profile}: {self.label}"
