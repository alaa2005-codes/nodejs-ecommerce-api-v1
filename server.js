//هو المسؤول عن تشغيل السيرفر وبوصل كل الملفات مع بعضها
const path   = require('path');


const express = require('express');//مكتبه تعملي Api
const dotenv = require('dotenv');//تقرأ لي  الملفات من ال config.env
const morgan = require('morgan');// تطبع كل طلب يدخل الى السرفر
const cors = require('cors');
const compression = require('compression')

dotenv.config({ path: './config.env' });
const ApiError     = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
//Routes
const mountRoutes = require('./routes');

const { webhookCheckout } = require('./services/orderService');
//connect with db
dbConnection();

// express app
const app = express();
// Enable other domains to access your application 
app.use(cors());
app.options('/*splat', cors());
// compress all responses
app.use(compression());

// Middlewares
app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);
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
const server = app.listen(PORT, '0.0.0.0', () => {
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