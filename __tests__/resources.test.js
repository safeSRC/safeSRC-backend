import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import City from '../lib/Model/City.js';
import State from '../lib/Model/State.js';
import Category from '../lib/Model/Category.js';
// import Resource from '../lib/models/Resource.js';
// I hate everything

describe('demo CRUD routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('tests create resource route', async () => {
    await State.insert({ us_state: 'MN' });
    await City.insert({ city: 'Minneapolis', state_id: 1 });
    await Category.insert({ category: 'Butt' });

    const resource = {
      src_name: 'Tubman Family Crisis and Support Services',
      src_description: 'We help people with stuff',
      st_address: '4432 Chicago Avenue South',
      city_id: 1,
      county: 'Hennepin',
      zip: '55407',
      state_id: 1,
      main_number: '612-825-0000',
      alt_number: '612-825-3333',
      email: '',
      website: 'https://www.tubman.org/',
      category_id: 1,
      tags: ['General', 'butts', 'butter'],
    };
    const res = await request(app)
      .post('/api/v1/resources')
      .send(resource);

    expect(res.body).toEqual({
      ...resource,
      id: '1'
    });
  });
});
