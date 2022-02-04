FROM node:16.13.2-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . ./

EXPOSE 3000