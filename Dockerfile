FROM node:16-alpine

RUN apk update && \
    apk upgrade && \
    apk add nginx && \
    adduser -D -g 'www' www && \
    mkdir /www && \
    chown -R www:www /var/lib/nginx && \
    chown -R www:www /www && \
    mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig && \
    touch /run/nginx/nginx.pid

COPY ./config/nginx.conf /etc/nginx/

RUN mkdir /app
WORKDIR /app

COPY ./dx2021_webapp /app

RUN npm install -y && \
    npm run build

EXPOSE 80

ENTRYPOINT nginx -g 'daemon off;'