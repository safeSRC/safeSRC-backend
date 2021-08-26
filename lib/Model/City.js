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

  static async getAllCities() {
    const { rows } = await pool.query(`SELECT * FROM cities`);

    return rows.map((row) => new City(row));
  }
  static async getCityById(id) {
    const { rows } = await pool.query(`SELECT * FROM cities WHERE id = $1`, [
      id,
    ]);
    return new City(rows[0]);
  }

 static async getCityByName(name) {
    const { rows } = await pool.query(`SELECT * FROM cities WHERE city = $1`, [
      name
    ]);
   if (!rows[0]) return null;
    return new City(rows[0]);
  }



  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cities WHERE id=$1 RETURNING *',
      [id]
    );

    return new Resource(rows[0]);
  }
}
