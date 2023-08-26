const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !💥 Shutting down!');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(console.log('Connected to Database! 🎉'))
  .catch('Error !💥 Database connection is failed');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🔥`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION !💥 Shutting down!');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
