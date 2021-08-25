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
    (this.src_name = row.src_name),
      (this.src_description = row.src_description);
    (this.city_id = row.city_id),
      (this.info = row.info),
      (this.category_id = row.category_id),
      (this.tags = row.tags);
  }

  static async insert({
    src_name,
    src_description,
    city_id,
    info,
    category_id,
    tags,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO resources (src_name, src_description, city_id, info, category_id, tags)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [src_name, src_description, city_id, info, category_id, tags]
    );
    return new Resource(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [
      id,
    ]);
    return new Resource(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT *
    FROM resources
    INNER JOIN cities
    ON cities.id = resources.city_id`);
    return rows.map((row) => new Resource(row));
  }

  static async updateById(
    id,
    { src_name, src_description, city_id, info, category_id, tags }
  ) {
    const existingResource = await Resource.getById(id);
    const newSrcName = src_name ?? existingResource.src_name;
    const newDescription = src_description ?? existingResource.src_description;
    const newCityId = city_id ?? existingResource.city_id;
    const newInfo = info ?? existingResource.info;
    const newCategoryId = category_id ?? existingResource.category_id;
    const newTags = tags ?? existingResource.tags;
    const { rows } = await pool.query(
      `
    UPDATE resources SET src_name=$1, src_description=$2, city_id=$3, info=
    $4, category_id=$5, tags=$6 WHERE id=$7 RETURNING *`,
      [newSrcName, newDescription, newCityId, newInfo, newCategoryId, newTags]
    );
    return new Resource(rows[0]);
  }
}
