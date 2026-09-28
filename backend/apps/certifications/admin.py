from django.contrib import admin

from .models import Certification


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ["name", "issuer", "issued_on", "expires_on"]
    list_filter = ["issuer"]
    search_fields = ["name", "issuer", "credential_id"]
    ordering = ["-issued_on", "name"]
