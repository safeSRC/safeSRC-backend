import { Router } from 'express';
import Resource from '../Model/Resource.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const resource = await Resource.insert(req.body);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  });
