from django.db import models

from common.models import TimestampedModel


class Certification(TimestampedModel):
    name = models.CharField(max_length=180)
    issuer = models.CharField(max_length=180)
    credential_id = models.CharField(max_length=160, blank=True)
    credential_url = models.URLField(blank=True, null=True)
    issued_on = models.DateField(null=True, blank=True)
    expires_on = models.DateField(null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["-issued_on", "order", "name"]
        constraints = [
            models.CheckConstraint(condition=models.Q(expires_on__isnull=True) | models.Q(issued_on__isnull=True) | models.Q(expires_on__gte=models.F("issued_on")), name="cert_expiry_after_issue"),
        ]

    def __str__(self) -> str:
        return f"{self.name} — {self.issuer}"
