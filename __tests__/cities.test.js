import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import City from '../lib/Model/City.js';

const city = { city: 'Portland' };
const city2 = { city: 'Minneapolis' };
const city3 = { city: 'San Jose' };
const city4 = { city: 'Reno' };

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a city via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cities')
      .send({ city: 'Portland' });

    expect(res.body).toEqual({
      id: '1',
      city: 'Portland',
    });
  });
  it('gets all cities via GET', async () => {
    await City.insert(city, city2, city3, city4);

    const res = await request(app).get('/api/v1/cities');
    expect(res.body).toEqual([
      {
        id: '1',
        ...city
      },
      {
        id: '2',
        ...city2
      },
      {
        id: '3',
        ...city3,
      },
      {
        id: '4',
        ...city4
      }
    ]);
  });
});
