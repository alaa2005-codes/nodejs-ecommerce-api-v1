FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

ENV DB_URI="mongodb+srv://<db_username>:<db_password>@cluster0.zgjgvon.mongodb.net/?appName=Cluster0"

CMD ["node", "server.js"]
