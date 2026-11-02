import { app } from "./app.js";
import { pool } from "./data/bd.js";

await pool.query("SELECT 1");

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`API sur le port ${PORT}`))