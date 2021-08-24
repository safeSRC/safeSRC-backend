import pool from '../utils/pool.js';

export default class State {
  id;
  us_state;

  constructor(row) {
    this.id = row.id;
    this.us_state = row.us_state;
  }

  static async insert({ us_state }) {
    const { rows } = await pool.query(
      `INSERT INTO us_states (us_state)
            VALUES ($1)
            RETURNING *`,
      [us_state]
    );

    return new State(rows[0]);
  }
}
