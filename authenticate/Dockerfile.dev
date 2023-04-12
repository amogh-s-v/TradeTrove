FROM node:alpine

WORKDIR /authenticate

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./authenticate.js"]