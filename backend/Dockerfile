FROM python:3.10

USER root

RUN apt update && apt install vim -y

RUN mkdir /api
COPY ./ /api/
WORKDIR /api

RUN chown -R root:root /api && pip install -U pip && pip install -Ur /api/requirements.txt

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
