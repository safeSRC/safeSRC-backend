import { Router } from 'express';
import Category from '../Model/Category.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const category = await Category.insert(req.body);

    res.send(category);
  } catch (err) {
    next(err);
  }
});
