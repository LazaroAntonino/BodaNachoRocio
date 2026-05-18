import { sql } from "./_db.js";
import { handlePreflight, setCors } from "./_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = parseInt(req.query?.userId, 10);
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Se requiere ?userId=X" });
  }

  try {
    const [me] = await sql`
      SELECT busca FROM users WHERE id = ${userId} LIMIT 1
    `;
    if (!me) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let candidates;
    if (me.busca === "ambos") {
      candidates = await sql`
        SELECT id, nombre, edad, foto_url, descripcion
        FROM   users
        WHERE  id != ${userId}
          AND  onboarding_completado = true
          AND  id NOT IN (
                 SELECT to_user_id FROM likes WHERE from_user_id = ${userId}
               )
        ORDER BY RANDOM()
        LIMIT 20
      `;
    } else {
      candidates = await sql`
        SELECT id, nombre, edad, foto_url, descripcion
        FROM   users
        WHERE  id != ${userId}
          AND  onboarding_completado = true
          AND  genero = ${me.busca}
          AND  id NOT IN (
                 SELECT to_user_id FROM likes WHERE from_user_id = ${userId}
               )
        ORDER BY RANDOM()
        LIMIT 20
      `;
    }

    return res.status(200).json({ candidates });
  } catch (err) {
    console.error("Candidates error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
