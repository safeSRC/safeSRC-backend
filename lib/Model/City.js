import pool from '../utils/pool.js';

export default class City {
  id;
  city;
  state_id;

  constructor(row) {
    this.id = row.id;
    this.city = row.city;
    this.state_id = row.state_id;
  }

  static async insert({ city, state_id }) {
    const { rows } = await pool.query(
      `INSERT INTO cities (city, state_id)
            VALUES ($1, $2)
            RETURNING *`,
      [city, state_id]
    );

    return new City(rows[0]);
  }
}
