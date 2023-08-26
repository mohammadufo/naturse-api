const AppError = require('../utils/appError');

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  const message = `Duplicate field for ${Object.keys(err.keyValue)[0]} : ${
    Object.values(err.keyValue)[0]
  }. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors);

  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sentErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sentErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR! 🤬 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!💥',
    });
  }
};

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sentErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDb(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDb(error);
    if (err.code === 11000) error = handleDuplicateFieldsDb(error);

    sentErrorProd(error, res);
  }
};
