import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Pool, neonConfig } from "@neondatabase/serverless";

// Neon serverless requiere ws en Node.js (entorno Vercel Functions)
import ws from "ws";
neonConfig.webSocketConstructor = ws;

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Protección por token secreto
  const token = req.headers["x-migrate-token"];
  if (!process.env.MIGRATE_TOKEN || token !== process.env.MIGRATE_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Usamos Pool (API pg-compatible) para ejecutar SQL multi-statement
  // neon() solo soporta tagged template literals, no raw strings
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schema);
    return res.status(200).json({ ok: true, message: "Migration completed" });
  } catch (err) {
    console.error("Migration error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  } finally {
    await pool.end();
  }
}
