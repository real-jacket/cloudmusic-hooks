FROM node

WORKDIR /

ADD . /

RUN npm install && npm run build

FROM nginx

COPY /build/ /usr/share/nginx/html/

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf