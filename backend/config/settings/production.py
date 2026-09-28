import os

from .base import *

DEBUG = False
if not os.getenv("SECRET_KEY"):
    raise RuntimeError("SECRET_KEY must be configured in production.")
if not os.getenv("ALLOWED_HOSTS"):
    raise RuntimeError("ALLOWED_HOSTS must be configured in production.")
if not os.getenv("DATABASE_URL", "").startswith(("postgres://", "postgresql://", "postgresql+psycopg://")):
    raise RuntimeError("Production requires a PostgreSQL DATABASE_URL.")

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = os.getenv("SECURE_SSL_REDIRECT", "true").lower() in {"1", "true", "yes"}
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
STORAGES["staticfiles"]["BACKEND"] = "whitenoise.storage.CompressedManifestStaticFilesStorage"
