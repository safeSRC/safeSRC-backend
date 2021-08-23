import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Resources from '../lib/models/Resources.js';

describe('demo CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('tests create resource route', async () => {
    const resource = {
      name: 'Tubman Family Crisis and Support Services',
      address: '4432 Chicago Avenue South',
      city: 'Minneapolis',
      city_id: 2,
      county: 'Hennepin',
      zip: 55407,
      usstate: 'MN',
      state_id: 2,
      number: '612-825-0000',
      number2: '612-825-3333',
      email: '',
      website: 'https://www.tubman.org/',
      category: 'Mental Health',
      category_id: 1,
      subcategory: 'General',
    };
    const res = await request(app)
      .post('/api/v1/resources')
      .send(resource);

    expect(res.body).toEqual({
      ...resource,
      id: 1
    });
  });
});
