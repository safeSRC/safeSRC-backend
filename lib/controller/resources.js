import { Router } from 'express';
import Resource from '../models/Resource.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const resource = await Resource.insert(req.body);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resource.getById(id);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const resources = await Resource.getAll();

      res.send(resources);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { srcName, srcDescription, cityId, info, categoryId, tags } =
        req.body;
      const resource = await Resource.updateById(id, {
        srcName,
        srcDescription,
        cityId,
        info,
        categoryId,
        tags,
      });

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resource.deleteById(id);

      res.send({ message: `${resource.srcName} has been deleted!` });
    } catch (err) {
      next(err);
    }
  });
