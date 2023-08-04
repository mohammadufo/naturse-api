const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((el) => el.id === +id);

  if (!tour)
    return res.status(404).json({
      status: 'failed',
      message: 'tour not found!',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === +id);

  if (!tour)
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour will be here',
    },
  });
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === +id);

  if (!tour)
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
