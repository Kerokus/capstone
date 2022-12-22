FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install --force --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "start" ]
