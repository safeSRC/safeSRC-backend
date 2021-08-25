import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Category from '../lib/Model/Category.js';

describe('categories routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts a category into the categories table with POST', async () => {
    const category = {
      category: 'housing',
    };

    const res = await request(app).post('/api/v1/categories').send(category);

    expect(res.body).toEqual({
      id: '1',
      ...category,
    });
  });

  it('gets a category by id with GET', async () => {
    const category = await Category.insert({
      category: 'lgtbq',
    });

    const res = await request(app).get(`api/v1/categories/${category.id}`);

    expect(res.body).toEqual(category);
  });
});
