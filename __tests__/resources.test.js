import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import City from '../lib/Model/City.js';
import Category from '../lib/Model/Category.js';
import Resource from '../lib/Model/Resource.js';

const resource = {
  src_name: 'Tubman Family Crisis and Support Services',
  src_description: 'We help people with stuff',
  info: ['612-825-0000', '612-825-3333', 'x@x.x'],
  city_id: 1,
  category_id: 1,
  tags: ['General', 'health', 'butter'],
};

describe('demo CRUD routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('tests create resource route', async () => {
    await City.insert({ city: 'Minneapolis' });
    await Category.insert({ category: 'Health' });

    const res = await request(app).post('/api/v1/resources').send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });

  it('gets a resource by id via GET', async () => {
    await City.insert({ city: 'Minneapolis' });
    await Category.insert({ category: 'Health' });
    const currentResrc = await Resource.insert(resource);

    const res = await request(app).get(`/api/v1/resources/${currentResrc.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...currentResrc,
    });
  });
});
