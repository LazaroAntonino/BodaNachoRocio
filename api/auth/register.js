import { sql } from "../_db.js";
import { handlePreflight, setCors } from "../_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, password } = req.body ?? {};

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios: nombre, email, password" });
  }

  try {
    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (existing.length > 0) {
      return res.status(409).json({ error: "Ya existe una cuenta con ese email" });
    }

    const [user] = await sql`
      INSERT INTO users (nombre, email, password, onboarding_completado)
      VALUES (${nombre}, ${email}, ${password}, false)
      RETURNING id, nombre, email, onboarding_completado
    `;

    return res.status(201).json({ user });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
