FROM node:alpine

WORKDIR /cart

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./cart.js"]