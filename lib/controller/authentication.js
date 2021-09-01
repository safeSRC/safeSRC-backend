import { Router } from 'express';
import UserService from '../services/UserService.js';

const ONE_DAY = 1000 * 60 * 60 * 24;

export default Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: ONE_DAY,
      });

      res.send(user);
    } catch (err) {
      next(err);
    }
  })

  .post('/login', async (req, res, next) => {
    try {
      const user = await UserService.authorize(req.body);

      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: ONE_DAY,
      });

      res.send(user);
    } catch (err) {
      next(err);
    }
  });
