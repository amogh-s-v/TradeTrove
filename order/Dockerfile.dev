FROM node:alpine

WORKDIR /order

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./order.js"]