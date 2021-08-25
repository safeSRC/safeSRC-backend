import { Router } from 'express';
import Category from '../Model/Category.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const category = await Category.insert(req.body);

      res.send(category);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.getById(id);

      res.send(category);
    } catch (err) {
      next(err);
    }
  });
