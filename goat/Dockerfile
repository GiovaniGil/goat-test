FROM node:10

WORKDIR /usr/src/app/goat

COPY package*.json ./

RUN yarn install

EXPOSE 8080

CMD ["yarn", "serve"]