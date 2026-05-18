import { sql } from "./_db.js";
import { setCors, handlePreflight } from "./_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  try {
    await sql`SELECT 1`;
    return res.status(200).json({ ok: true, db: "connected" });
  } catch (err) {
    console.error("Health check failed:", err.message);
    return res.status(500).json({ ok: false, db: "error", error: err.message });
  }
}
