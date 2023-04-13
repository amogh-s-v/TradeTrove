FROM node:alpine

WORKDIR /items

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./items.js"]