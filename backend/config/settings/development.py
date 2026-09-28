import os
import secrets

from .base import *

SECRET_KEY = SECRET_KEY or secrets.token_urlsafe(48)
DEBUG = os.getenv("DEBUG", "true").lower() in {"1", "true", "yes"}
ALLOWED_HOSTS = [*ALLOWED_HOSTS, "testserver"]
