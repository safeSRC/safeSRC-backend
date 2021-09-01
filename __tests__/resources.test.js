import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import City from '../lib/models/City.js';
import Category from '../lib/models/Category.js';
import Resource from '../lib/models/Resource.js';

const mockResource1 = {
  srcName: 'Tubman Family Crisis and Support Services',
  srcDescription: 'We help people with stuff',
  info: ['612-825-0000', '612-825-3333', 'x@x.x'],
  cityId: 1,
  categoryId: 1,
  tags: ['General', 'health', 'butter'],
};

const mockResource2 = {
  srcName: 'Second Resource',
  srcDescription: 'We do things',
  info: ['612-000-0000', '612-000-3333', 'x@xx.x'],
  cityId: 1,
  categoryId: 1,
  tags: ['General', 'health', 'butter'],
};

const mockResource3 = {
  srcName: 'Boop',
  srcDescription: 'You call we boop',
  info: ['000-825-0000', '000-825-3333', 'x@x.x'],
  cityId: 1,
  categoryId: 1,
  tags: ['General', 'boop', 'butter'],
};

describe('resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await City.insert({ city: 'Minneapolis' });
    await Category.insert({ category: 'Health' });
  });

  it('tests create resource route', async () => {
    const res = await request(app).post('/api/v1/resources').send(mockResource1);

    expect(res.body).toEqual({
      id: '1',
      ...mockResource1,
    });
  });

  it('gets a resource by id via GET', async () => {
    const resource = await Resource.insert(mockResource1);

    const res = await request(app).get(`/api/v1/resources/${resource.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });

  it('gets a list of resources via GET', async () => {
    await Resource.insert(mockResource1);
    await Resource.insert(mockResource2);
    await Resource.insert(mockResource3);

    const res = await request(app).get('/api/v1/resources');

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: '1',
          ...mockResource1,
        },
        {
          id: '2',
          ...mockResource2,
        },
        {
          id: '3',
          ...mockResource3,
        },
      ])
    );
  });

  it('updates a resource via PUT', async () => {
    const resource = await Resource.insert(mockResource1);

    const res = await request(app)
      .put(`/api/v1/resources/${resource.id}`)
      .send({ srcDescription: 'this is new' });

    expect(res.body).toEqual({
      id: 1,
      ...resource,
      srcDescription: 'this is new',
    });
  });

  it('deletes an existing resource by id via DELETE', async () => {
    const resource = await Resource.insert(mockResource1);

    const res = await request(app).delete(
      `/api/v1/resources/${resource.id}`
    );

    expect(res.body).toEqual({
      message: `${resource.srcName} has been deleted!`,
    });
  });
});
