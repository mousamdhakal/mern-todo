require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const apiRoute = require('./routes');

// Connect to mongodb
mongoose.connect(process.env.CONNECTION_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the express application
const app = express();

// Parse urlencoded payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Parse json data
app.use(express.json());

// Handle cors error
app.use(cors());

// Set up api for use
app.use('/api', apiRoute);

// Page not found
app.use((req, res, next) => {
  // 404 catch block
  next({
    message: 'Not Found',
    status: 404,
  });
});

// Error handling function
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    message: err.message || err.sqlMessage || err || 'Server Error',
    status: err.status || 400,
  });
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));

db.once('open', function () {
  // Start listening on the port specified in the environment
  app.listen(process.env.PORT, () => {
    console.log('app running on port ', process.env.PORT);
  });
});
