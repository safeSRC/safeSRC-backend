import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Resource from '../lib/models/Resource.js';

describe('demo CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('tests create resource route', async () => {
    const resource = {
      src_name: 'Tubman Family Crisis and Support Services',
      src_description: 'We help people with stuff',
      st_address: '4432 Chicago Avenue South',
      city_id: 2,
      county: 'Hennepin',
      zip: 55407,
      state_id: 2,
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
      id: 1
    });
  });
});
