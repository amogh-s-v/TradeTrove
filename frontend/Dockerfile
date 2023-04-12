FROM node:alpine as ecommerce-app-build

WORKDIR /frontend

COPY package.json ./

RUN yarn

COPY ./public ./public

COPY ./src ./src

RUN yarn build

FROM nginx:latest

COPY --from=ecommerce-app-build /frontend/build/ /usr/share/nginx/html

EXPOSE 80