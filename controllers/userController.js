const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined! ☹️',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined! ☹️',
  });
};

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findOne(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined! ☹️',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not yet defined! ☹️',
  });
};
