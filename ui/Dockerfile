FROM node:alpine

WORKDIR /app

COPY . /app

EXPOSE 3000

# RUN apk update && apk add bash

RUN npm install --force --legacy-peer-deps

CMD [ "npm", "start" ]
