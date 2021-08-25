import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import City from '../lib/Model/City.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a city via POST', async () => {
    // const city = await City.insert({ city: 'Portland' });
    const res = await request(app).post('/api/v1/cities').send({ city: 'Portland' });

    expect(res.body).toEqual({
      id: '1',
      city: 'Portland'
    });
  });
});
