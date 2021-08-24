import pool from '../utils/pool.js';

export default class Resource {
  id;
  src_name;
  src_description;
  city_id;
  info;
  category_id;
  tags;

  constructor(row) {
    this.id = row.id;
    this.src_name = row.src_name,
    this.src_description = row.src_description;
    this.city_id = row.city_id,
    this.info = row.info,
    this.category_id = row.category_id,
    this.tags = row.tags
}

  static async insert({ src_name, src_description, city_id, info, category_id, tags }) {
    const { rows } = await pool.query(
      `
      INSERT INTO resources (src_name, src_description, city_id, info, category_id, tags)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        src_name,
        src_description,
        city_id,
        info,
        category_id,
        tags
      ]
    );
    return new Resource(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
        'SELECT * FROM resources WHERE id=$1', [id]);
        return new Resource(rows[0]);
}
}