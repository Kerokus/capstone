FROM node:alpine

WORKDIR /app

COPY . /app

EXPOSE 8081

# RUN apk update && apk add bash

RUN npm install --force --legacy-peer-deps

CMD ["npm", "start", "migrate", "seed"]
