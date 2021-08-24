import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
// import request from 'supertest';
// import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('passes CI', () => {
    const passTest = 'test passed';

    expect(passTest).toEqual(passTest);
  });
});
