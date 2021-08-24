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

  it('gets a list of resources via GET', async () => {
    await City.insert({ city: 'Minneapolis' });
    await Category.insert({ category: 'Health' });
    const resrc1 = await Resource.insert(resource);
    const resrc2 = {
      src_name: 'Second Resource',
      src_description: 'We do things',
      info: ['612-000-0000', '612-000-3333', 'x@xx.x'],
      city_id: 1,
      category_id: 1,
      tags: ['General', 'health', 'butter'],
    };
    const resrc3 = {
      src_name: 'Boop',
      src_description: 'You call we boop',
      info: ['000-825-0000', '000-825-3333', 'x@x.x'],
      city_id: 1,
      category_id: 1,
      tags: ['General', 'boop', 'butter'],
    };

    await request(app).post('/api/v1/resources').send(resrc1);
    await request(app).post('/api/v1/resources').send(resrc2);
    await request(app).post('/api/v1/resources').send(resrc3);

    return request(app)
      .get('/api/v1/resources')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            ...resrc1
          },
          {
            id: '2',
            ...resrc2
          },
          {
            id: '3',
            ...resrc3
          }
        ]);
      });
  });
});
