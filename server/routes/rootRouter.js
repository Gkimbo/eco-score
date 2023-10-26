const express = require('express');
// const clientRouter = require('./clientRouter');
// const userSessionsRouter = require('./api/v1/userSessionsRouter');

const rootRouter = new express.Router();

// rootRouter.use('/api/v1/user-sessions', userSessionsRouter);
// rootRouter.use('/', clientRouter);

module.exports = rootRouter;
