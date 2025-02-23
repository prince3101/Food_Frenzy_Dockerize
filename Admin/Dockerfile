FROM node:14

WORKDIR /admin

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]