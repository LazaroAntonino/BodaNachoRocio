/**
 * migrate-cli.js
 * Ejecuta api/schema.sql contra la base de datos PostgreSQL.
 * Uso: node migrate-cli.js
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
    console.error("❌  Falta la variable de entorno DATABASE_URL");
    process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const schema = readFileSync(join(__dirname, "api", "schema.sql"), "utf-8");

try {
    await pool.query(schema);
    console.log("✅  Migración completada correctamente.");
} catch (err) {
    console.error("❌  Error al ejecutar la migración:", err.message);
    process.exit(1);
} finally {
    await pool.end();
}
