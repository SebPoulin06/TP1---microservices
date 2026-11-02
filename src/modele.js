import { pool } from "./data/bd.js";

export const staff = {
    async lister() {
        const { rows } = await pool.query(`SELECT * FROM "staff"`);
        return rows;
    },

    async trouverParId(id){
        const { rows } = await pool.query(`SELECT * FROM "staff" WHERE id = $1`, [id]);
        return rows[0] ?? null;
    },

    async creer(name, role) {
        const { rows } = await pool.query(`INSERT INTO "staff" (name, role) VALUES ($1, $2) RETURNING *`, [name, role]);
        return rows[0];
    },

};


export const table = {
    async lister(status) {
        if(status) {
            const { rows } = await pool.query("SELECT * FROM tables WHERE status = $1 ORDER BY id", [status]);

            return rows;
        }
        
        const { rows } = await pool.query("SELECT * FROM tables ORDER BY id");
        return rows;
    },

    async trouverParId(id) {
        const { rows } = await pool.query("SELECT * FROM tables WHERE id = $1", [id]);

        return rows[0] ?? null;
    },

    async creer(number, seats) {
        const { rows } = await pool.query(`INSERT INTO "tables" (number, seats, status, "serverId", guests) VALUES ($1, $2, 'free', NULL, 0) RETURNING *`, [number, seats]);
        return rows[0];
    },

    async modifier(id, number, seats) {
        const { rows } = await pool.query(`UPDATE "tables" SET number = $1, seats = $2 WHERE id = $3 RETURNING *`, [number, seats, id]);
        return rows[0] ?? null;
    },

    async supprimer(id) {
        const { rowCount } = await pool.query(`DELETE FROM "tables" WHERE id = $1`, [id]);
        return rowCount > 0;
    },

    async installer(id, serverId, guests) {
        const { rows } = await pool.query(`UPDATE "tables" SET status = 'occupied', "serverId" = $1, guests = $2 WHERE id = $3 AND status = 'free' RETURNING *`, [serverId, guests, id]);
        return rows[0] ?? null;
    },

    async liberer(id) {
        const { rows } = await pool.query(`UPDATE "tables" SET status = 'free', "serverId" = NULL, guests = 0 WHERE id = $1 RETURNING *`, [id]);
        return rows[0] ?? null;
    }

}

export const menuItems = {
    async lister(category) {
        
        if (category !== undefined) {
            const { rows } =await pool.query('SELECT * FROM "MenuItem" WHERE category = $1 ORDER BY id', [category]);
            return rows;
        } 
        
        const { rows } = await pool.query(`SELECT * FROM "menuItem"`);
        return rows;
    },

    async trouverParId(id){
        const { rows } = await pool.query(`SELECT * FROM "menuItem" WHERE id = $1`, [id]);
        return rows[0] ?? null;
    },

    async creer(name, category, priceCents, available) {
        const { rows } = await pool.query(`INSERT INTO "menuItem" (name, category, "priceCents", available) VALUES ($1, $2, $3, $4) RETURNING *`, [name, category, priceCents, available]);
        return rows[0];
    },

    async modifier(id, name, category, priceCents, available) {
        const { rows } = await pool.query(`UPDATE "menuItem" SET name = $1, category = $2, "priceCents" = $3, available = $4 WHERE id = $5 RETURNING *`, [name, category, priceCents, available, id]);
        return rows[0] ?? null;
    },

    async supprimer(id) {
        const { rowCount } = await pool.query('DELETE FROM "menuItem" WHERE id = $1',[id]);
        return rowCount > 0;
    }

}

export const orders = {
    async lister(tableId) {
        
        if (tableId !== undefined) {
            const { rows } = await pool.query('SELECT * FROM "order" WHERE "tableId" = $1 ORDER BY id', [tableId]);
            return rows;
        }

        const { rows } = await pool.query('SELECT * FROM "order" ORDER BY id');
        return rows;
    },

    async trouverParId(id){
        const { rows } = await pool.query(`SELECT * FROM "order" WHERE id = $1`, [id]);
        return rows[0] ?? null;
    },

    async creer(tableId, serverId, items) {
        const { rows } = await pool.query(`INSERT INTO "order" ("tableId", "serverId", items, "createdAt") VALUES ($1, $2, $3::json, NOW()) RETURNING *`, [tableId, serverId, JSON.stringify(items)]);
        return rows[0];
    },

    async modifierItems(id, items) {
        const { rows } = await pool.query(`UPDATE "order" SET items = $1::json WHERE id = $2 RETURNING *`, [JSON.stringify(items), id]);
        return rows[0] ?? null;
    },



}