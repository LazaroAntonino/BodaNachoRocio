import { sql } from "../_db.js";
import { handlePreflight, setCors } from "../_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = parseInt(req.query?.userId, 10);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Se requiere el parámetro ?userId=X" });
  }

  try {
    const [user] = await sql`
      SELECT id, nombre, email, onboarding_completado,
             foto_url, edad, genero, busca, descripcion, created_at
      FROM   users
      WHERE  id = ${userId}
      LIMIT  1
    `;

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Me error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
