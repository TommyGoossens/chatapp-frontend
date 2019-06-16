FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run ng build --prod --output-path-dist

