const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'failed';
  // err.statusCode = 404;

  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// eslint-disable-next-line
app.use(globalErrorHandler);

module.exports = app;
