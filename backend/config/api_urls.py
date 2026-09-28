from django.urls import include, path

urlpatterns = [
    path("profile/", include("apps.profile.urls")),
    path("social-links/", include("apps.profile.social_urls")),
    path("projects/", include("apps.projects.urls")),
    path("technologies/", include("apps.technologies.urls")),
    path("skills/", include("apps.skills.urls")),
    path("experience/", include("apps.experience.urls")),
    path("education/", include("apps.education.urls")),
    path("certifications/", include("apps.certifications.urls")),
    path("startups/", include("apps.startups.urls")),
    path("contact/", include("apps.contact.urls")),
]
