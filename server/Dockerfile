FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

EXPOSE 3001

CMD ["npm", "run", "dev"]

FROM node:20-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]