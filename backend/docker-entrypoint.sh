#!/bin/bash
set -a
source .env
set +a

python manage.py collectstatic --noinput

# Применение миграций
python manage.py makemigrations api
python manage.py migrate

# Заполнение БД тестовыми данными
python manage.py init_db

uwsgi --ini /api/uwsgi.ini --static-map /static=/api/static/