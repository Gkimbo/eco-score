/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const rootRouter = require('./routes/rootRouter');

const app = express();
const port = 3000;

// Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with the specific origin of your React Native app
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json());

// Routes
// app.use(rootRouter);
app.get('/api/v1/test', (req, res) => {
  console.log('HERE!!!!');
  res.status(200).json('hello');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
