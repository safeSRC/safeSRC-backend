import { Router } from 'express';
import Villagers from '../Model/TestModel.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const villager = await Villagers.insert(req.body);

      res.send(villager);
    } catch (err) {
      next(err);
    }
  });
