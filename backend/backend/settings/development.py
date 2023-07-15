from .settings import *
from .log import *
# from .cors import *
from .database import *

"""
Данный файл настроек внесен в .dockerignore, 
Задание тестовое - в .gitignore не внес

# MyFile
**/development.py
"""

DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True

# Удобней тестить из свеггер документации, но на вскус и цвет фломастеры разные
REST_FRAMEWORK.get('DEFAULT_RENDERER_CLASSES').append('rest_framework.renderers.BrowsableAPIRenderer')


LOGGING = get_logging_config(DEBUG)
