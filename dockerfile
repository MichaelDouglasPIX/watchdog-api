FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3333
CMD ["npm", "run", "start:watch"]