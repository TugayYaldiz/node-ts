FROM node:13

RUN apt-get update

WORKDIR /code
COPY . .
