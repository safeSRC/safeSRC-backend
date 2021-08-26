import { Router } from 'express';
import City from '../Model/City.js';
import Resource from '../Model/Resource.js';

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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const city = await City.getCityById(id);
      res.send(city);
    } catch (err) {
      next(err);
    }
  })

  .get('/search/:name', async (req, res, next) => {
    try {
      const name = req.params.name;
      const city = await City.getCityByName(name);
      if (!city) {
        res.send({
          message: 'city not found'
        })
      }
      else {
        const resources = await Resource.getByCityId(city.id);
        res.send({
          resources,
          city
        });
      }
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await City.deleteById(id);

      res.send({ message: `${city.city} has been deleted!` });
    } catch (err) {
      next(err);
    }
  });
