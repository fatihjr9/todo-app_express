FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma migrate deploy

EXPOSE 3030

CMD ["npm", "start"]
