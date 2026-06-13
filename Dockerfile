FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

ENV DB_URI="mongodb+srv://Alaa:Alaa123456@cluster0.zgjgvon.mongodb.net/udemy-ecommerce-db?retryWrites=true&w=majority"
ENV STRIPE_WEBHOOK_SECRET="whsec_lJCX8IvXCgFXUOfcM3XP6m2pIcs4bAPU"
CMD ["node", "server.js"]
