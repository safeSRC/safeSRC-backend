import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('auth routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signs a user up with POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'email@email.com', password: 'password' });

    expect(res.body).toEqual({ id: '1', email: 'email@email.com' });
  });

  it('logs a user in with POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'email@email.com', password: 'password' });

    expect(res.body).toEqual({ id: '1', email: 'email@email.com' });
  });

});
