from django.contrib import admin

from .models import Profile, SocialLink


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 0


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["display_name", "email", "location", "is_active", "updated_at"]
    list_filter = ["is_active"]
    search_fields = ["display_name", "email", "headline"]
    ordering = ["display_name"]
    inlines = [SocialLinkInline]
