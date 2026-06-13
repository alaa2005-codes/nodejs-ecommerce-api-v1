FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

ENV DB_URI="mongodb+srv://Alaa:Alaa123456@cluster0.zgjgvon.mongodb.net/udemy-ecommerce-db?retryWrites=true&w=majority"
ENV STRIPE_WEBHOOK_SECRET="whsec_td1xJQTsVD91yJO8wduUFas3zGKoeOt4"
CMD ["node", "server.js"]
