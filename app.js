const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware! 👋🏻');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🔥`);
});
