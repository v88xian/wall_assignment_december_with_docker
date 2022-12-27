FROM node:19.0-alpine3.15
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json .

RUN npm install
COPY . .

EXPOSE 8088