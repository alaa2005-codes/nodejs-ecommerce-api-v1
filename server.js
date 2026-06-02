//هو المسؤول عن تشغيل السيرفر وبوصل كل الملفات مع بعضها
const path   = require('path');


const express = require('express');//مكتبه تعملي Api
const dotenv = require('dotenv');//تقرأ لي  الملفات من ال config.env
const morgan = require('morgan');// تطبع كل طلب يدخل الى السرفر

dotenv.config({ path: './config.env' });
const ApiError     = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
//Routes
const mountRoutes = require('./routes');
//connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'upload')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// Mount Routes
mountRoutes(app);

app.use((req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`,400));
});
//Global error handling middleware for express
app.use(globalError);
        const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
          console.log(`App running on port ${PORT}`);
        });
// Handle rejection outside express
process.on('unhandledRejection',(err)=>{
console.error(`UnhandledRejection Error: ${err}`);
server.close(()=>{
console.error('Shutting down....');
process.exit(1);
})
})