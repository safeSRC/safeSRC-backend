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
    const res = await request(app)
      .post('/api/v1/cities')
      .send({ city: 'Portland' });

    expect(res.body).toEqual({
      id: '1',
      city: 'Portland',
    });
  });
  it('gets all cities via GET', async () => {
    const city1 = { city: 'Portland' };
    const city2 = { city: 'Minneapolis' };
    const city3 = { city: 'San Jose' };
    const city4 = { city: 'Reno' };

    await City.insert(city1);
    await City.insert(city2);
    await City.insert(city3);
    await City.insert(city4);

    const res = await request(app).get('/api/v1/cities');
    expect(res.body).toEqual([
      {
        id: '1',
        ...city1
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
