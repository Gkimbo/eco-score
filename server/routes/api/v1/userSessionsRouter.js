/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
// import passport from 'passport';

const sessionRouter = new express.Router();

sessionRouter.post('/', (req, res, next) => {
  // return passport.authenticate('local', (err, user) => {
  //     if (err) {
  //         // eslint-disable-next-line no-console
  //         console.log(err);
  //     }

  //     if (user) {
  //         return req.login(user, () => {
  //             return res.status(201).json(user);
  //         });
  //     }

  return res.status(401).json(undefined);
  // })(req, res, next);
});

// sessionRouter.get('/current', async (req, res) => {
//     console.log(req);
// if (req.user) {
//     res.status(200).json(req.user);
// } else {
//     res.status(401).json(undefined);
// }
// });

sessionRouter.get('/current', async (req, res) => {
  const message = 'Logging from the backend';
  res.status(200).json({ message });
});

sessionRouter.delete('/', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'User signed out' });
});

module.exports = sessionRouter;
