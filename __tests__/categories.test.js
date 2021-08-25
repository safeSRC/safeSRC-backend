import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
      ...category
    });
  });


});
