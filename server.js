//هو المسؤول عن تشغيل السيرفر وبوصل كل الملفات مع بعضها
const path   = require('path');

const express = require('express');//مكتبه تعملي Api
const dotenv = require('dotenv');//تقرأ لي  الملفات من ال config.env
const morgan = require('morgan');// تطبع كل طلب يدخل الى السرفر
const cors = require('cors');
const compression = require('compression')
const rateLimit = require('express-rate-limit');//مكتبه تحدد عدد الطلبات الي تجي من نفس الاي بي
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

dotenv.config({ path: './config.env' });
const ApiError     = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const fs = require('fs'); if (!fs.existsSync('./upload')) { fs.mkdirSync('./upload'); }

//Routes
const mountRoutes = require('./routes');

const { webhookCheckout } = require('./services/orderService');
//connect with db
dbConnection();

// express app
const app = express();
app.set('trust proxy', 1);

// Enable other domains to access your application 
app.use(cors({ origin: "*" }));

// compress all responses
app.use(compression());

// Middlewares
app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);
app.use(express.json({limit: '20kb'}));
app.use(express.static(path.join(__dirname,'upload')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
//To apply data Sanitization 
//app.use(mongoSanitize());
//app.use(xss());
// Limit each IP to 100 requests per `window` (here, per 15 minutes).
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many accounts created from this IP, please try again after 15 minutes',
})

// Apply the rate limiting middleware to all requests.
app.use('/api',limiter)

//Middleware to protect against http parameter pollution attacks
app.use(hpp());
// Mount Routes
mountRoutes(app);

app.use((req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`,400));
});
//Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8080;
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
