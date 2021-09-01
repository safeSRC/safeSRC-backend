import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Category from '../lib/models/Category.js';

describe('categories routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('inserts a category into the categories table with POST', async () => {
    const category = {
      category: 'housing',
    };

    const res = await request(app).post('/api/v1/categories').send(category);

    expect(res.body).toEqual({
      id: expect.any(String), // matches any id
      ...category,
    });
  });

  it('gets a category by id with GET', async () => {
    const category = await Category.insert({
      category: 'lgtbq',
    });

    const res = await request(app).get(`/api/v1/categories/${category.id}`);

    // `{ ...category }` makes `Category` a plain, ol' Javascript object
    expect(res.body).toEqual({ ...category });
  });

  it('gets all categories with GET', async () => {
    // The `uncategorized` category will be in the response,
    // so we need to get it to add to our expectation
    const category0 = await Category.getById(1);

    const category1 = await Category.insert({
      category: 'housing',
    });
    const category2 = await Category.insert({
      category: 'animal',
    });
    const category3 = await Category.insert({
      category: 'substance abuse',
    });

    const res = await request(app).get('/api/v1/categories/');

    expect(res.body).toEqual([category0, category1, category2, category3]);
  });

  it('updates a category by id with PUT', async () => {
    const category = await Category.insert({
      category: 'lgtb',
    });

    const res = await request(app)
      .put(`/api/v1/categories/${category.id}`)
      .send({ category: 'lgtbq' });

    expect(res.body).toEqual({ ...category, category: 'lgtbq' });
  });
});
