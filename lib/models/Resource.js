import pool from '../utils/pool.js';

// Make sure to use consistent casing:
// snake_case for db records,
// camelCase for JavaScript classes
export default class Resource {
  id;
  srcName;
  srcDescription;
  cityId;
  info;
  categoryId;
  tags;

  constructor(row) {
    this.id = row.id;
    this.srcName = row.src_name;
    this.srcDescription = row.src_description;
    this.cityId = row.city_id;
    this.info = row.info;
    this.categoryId = row.category_id;
    this.tags = row.tags;
  }

  static async insert({
    srcName,
    srcDescription,
    cityId,
    info,
    categoryId,
    tags,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO resources (src_name, src_description, city_id, info, category_id, tags)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [srcName, srcDescription, cityId, info, categoryId, tags]
    );

    return new Resource(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [
      id,
    ]);

    if (!rows[0]) return null;

    return new Resource(rows[0]);
  }

  static async getByCityId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM resources WHERE city_id=$1',
      [id]
    );

    if (!rows[0]) return null;

    return rows.map((row) => new Resource(row));
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT
        resources.id,
        src_name,
        src_description,
        city_id,
        info,
        category_id,
        tags
      FROM resources
      LEFT JOIN cities
      ON cities.id = resources.city_id`);

    return rows.map((row) => new Resource(row));
  }

  static async updateById(
    id,
    { srcName, srcDescription, city_id, info, category_id, tags }
  ) {
    const existingResource = await Resource.getById(id);
    const newSrcName = srcName ?? existingResource.srcName;
    const newDescription = srcDescription ?? existingResource.srcDescription;
    const newCityId = city_id ?? existingResource.cityId;
    const newInfo = info ?? existingResource.info;
    const newCategoryId = category_id ?? existingResource.categoryId;
    const newTags = tags ?? existingResource.tags;

    const { rows } = await pool.query(
      `UPDATE resources
        SET
          src_name=$1,
          src_description=$2,
          city_id=$3,
          info=$4,
          category_id=$5,
          tags=$6
        WHERE id=$7
        RETURNING *`,
      [
        newSrcName,
        newDescription,
        newCityId,
        newInfo,
        newCategoryId,
        newTags,
        id,
      ]
    );

    return new Resource(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM resources WHERE id=$1 RETURNING *',
      [id]
    );

    return new Resource(rows[0]);
  }
}
