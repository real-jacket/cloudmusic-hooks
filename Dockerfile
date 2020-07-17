FROM node AS builder

WORKDIR /app/cloudMusic

COPY . .

RUN npm install && set REACT_APP_BASE_API=$SERVER_API && npm run build

FROM nginx

COPY --from=builder /app/cloudMusic/build/ /usr/share/nginx/html/

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf