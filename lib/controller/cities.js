import { Router } from 'express';
import City from '../Model/City.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const city = await City.insert(req.body);

      res.send(city);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cities = await City.getAllCities();
      res.send(cities);
    } catch (err) {
      next(err);
    }
  });
