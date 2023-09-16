const Review = require('../models/reviewModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.body.tour);

  if (!tour) {
    return next(new AppError('Invalid Tour!', 401));
  }

  const reviews = await Review.find({ tour: { $eq: tour.id } });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.body.tour);

  if (!tour) {
    return next(new AppError('Tour is not valid!', 401));
  }

  const reviewObj = {
    ...req.body,
    user: req.user.id,
  };

  const review = await Review.create(reviewObj);

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
