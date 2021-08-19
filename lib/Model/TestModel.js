import pool from '../utils/pool.js';

export default class Villagers {
    id;
    vid;
    name;

    constructor(row) {
        this.id = row.id;
        this.vid = row.vid;
        this.name = row.name;
    }

    static async insert(value) {
        const { rows } = await pool.query(
            'INSERT INTO villagers (vid, name) VALUES ($1, $2) RETURNING *',
            [value.vid, value.name]
        )
        return new Villagers(rows[0]);
    }
};