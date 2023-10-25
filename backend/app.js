/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const nodemon = require('nodemon');
const rootRouter = require('./routes/rootRouter');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(rootRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
