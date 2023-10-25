/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rootRouter = require('./routes/rootRouter');

const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:8081',
//   }),
// );
app.use(cors());

const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(rootRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
