FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# تأكيد فتح المنفذ الافتراضي للحاوية السحابية
EXPOSE 8080

CMD ["node", "server.js"]