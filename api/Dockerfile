FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon@2.0.20 &&\
    npm install

EXPOSE 8081

CMD ["npm", "start"]



