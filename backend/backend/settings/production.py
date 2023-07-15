from .settings import *
from .log import *
from .cors import *
from .database import *

DEBUG = False

ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True


LOGGING = get_logging_config(DEBUG)
