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
  })
  .get('/', async (req, res, next) => {
    try {
      const categories = await Category.getAll();

      res.send(categories);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category } = req.body;

      const updatedCategory = await Category.updateById(id, { category });

      res.send(updatedCategory);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      await Category.deleteById(id);
    } catch (err) {
      next(err);
    }
  });
