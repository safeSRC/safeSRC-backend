import pool from '../utils/pool.js';

export default class City {
  id;
  city;

  constructor(row) {
    this.id = row.id;
    this.city = row.city;
  }

  static async insert({ city }) {
    const { rows } = await pool.query(
      `INSERT INTO cities (city)
            VALUES ($1)
            RETURNING *`,
      [city]
    );

    return new City(rows[0]);
  }
}
