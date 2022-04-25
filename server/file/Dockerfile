FROM node:16-alpine

COPY app /usr/app
WORKDIR /usr/app

RUN npm install

EXPOSE 8002
CMD ["npm", "start"]
