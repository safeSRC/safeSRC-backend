import pool from '../utils/pool.js';

export default class Resources {
  id;
  name;
  src_description;
  st_address;
  city_id;
  county;
  zip;
  state_id;
  main_number;
  alt_number;
  email;
  website;
  category_id;
  tags;

  constructor(row) {
    this.id = row.id;
    this.name = row.name,
    this.src_description = row.src_description;
    this.st_address = row.st_address,
    this.city_id = row.city_id,
    this.zip = row.zip,
    this.county = row.county,
    this.state_id = row.state_id,
    this.main_number = row.main_number,
    this.alt_number = row.alt_number,
    this.email = row.email,
    this.website = row.website,
    this.category_id = row.category_id,
    this.tags = row.tags
}

  static async insert(resource) {
    const { rows } = await pool.query(
      `
      INSERT INTO resources (name, src_description, st_address, city_id, county, zip, state_id, main_number, alt_number, email, website, category_id, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        resource.name,
        resource.src_description,
        resource.st_address,
        resource.city_id,
        resource.county,
        resource.zip,
        resource.state_id,
        resource.main_number,
        resource.alt_number,
        resource.email,
        resource.website,
        resource.category_id,
        resource.tags
      ]
    );
    return new Resources(rows[0]);
  }
}