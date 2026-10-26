import { pool } from "./bd.js";

export const exemple = {
    async lister() {
        const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
        return rows;
    },

    async trouverParId(id){
        const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ${id}`);
        return rows[0] ?? null;
    }
};