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

const resource2 = {
  src_name: 'Second Resource',
  src_description: 'We do things',
  info: ['612-000-0000', '612-000-3333', 'x@xx.x'],
  city_id: 1,
  category_id: 1,
  tags: ['General', 'health', 'butter'],
};

const resource3 = {
  src_name: 'Boop',
  src_description: 'You call we boop',
  info: ['000-825-0000', '000-825-3333', 'x@x.x'],
  city_id: 1,
  category_id: 1,
  tags: ['General', 'boop', 'butter'],
};

describe('demo CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await City.insert({ city: 'Minneapolis' });
    await Category.insert({ category: 'Health' });
  });

  it('tests create resource route', async () => {
    const res = await request(app).post('/api/v1/resources').send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });

  it('gets a resource by id via GET', async () => {
    const currentResrc = await Resource.insert(resource);

    const res = await request(app).get(`/api/v1/resources/${currentResrc.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...currentResrc,
    });
  });

  it('gets a list of resources via GET', async () => {

    await Resource.insert(resource);
    await Resource.insert(resource2);
    await Resource.insert(resource3);


    const res = await request(app).get('/api/v1/resources');

    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: '1',
        ...resource,
      },
      {
        id: '2',
        ...resource2,
      },
      {
        id: '3',
        ...resource3,
      },
    ]));
  });
  
  it('updates a resource via PUT', async () => {
    const resrc = await Resource.insert(resource);

    const res = await request(app)
      .put(`/api/v1/resources/${resrc.id}`)
      .send({ src_description: 'this is new' });
    
    expect(res.body).toEqual({ 
      id: 1,
      ...resrc,
      src_description: 'this is new'
    });
  });

  it('deletes an existing resource by id via DELETE', async () => {
    const resrc = await Resource.insert(resource);

    const res = await request(app)
      .delete(`/api/v1/resources/${resrc.id}`);

    expect(res.body).toEqual({ 
      message: `${resrc.src_name} has been deleted!`
    });
  });
});
