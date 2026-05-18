import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Tagged-template wrapper that keeps all route files unchanged.
 * Usage: await sql`SELECT * FROM users WHERE id = ${id}`
 */
export async function sql(strings, ...values) {
    const text = strings.reduce((acc, part, i) =>
        acc + part + (i < values.length ? `$${i + 1}` : ""), "");
    const result = await pool.query(text, values);
    return result.rows;
}

export { pool };
