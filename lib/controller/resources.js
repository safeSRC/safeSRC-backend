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
      const { src_name, src_description, city_id, info, category_id, tags } =
        req.body;
      const updatedResource = await Resource.updateById(id, {
        src_name,
        src_description,
        city_id,
        info,
        category_id,
        tags,
      });
      res.send(updatedResource);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resrc = await Resource.deleteById(id);

      res.send({ message : `${resrc.src_name} has been deleted!`, });
    } catch (err) {
      next(err);
    }
  });
