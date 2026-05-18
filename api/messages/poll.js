import { sql } from "../_db.js";
import { handlePreflight, setCors } from "../_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const matchId = parseInt(req.query?.matchId, 10);
  const userId  = parseInt(req.query?.userId,  10);
  const afterId = parseInt(req.query?.afterId, 10) || 0;

  if (!matchId || !userId) {
    return res.status(400).json({ error: "Se requieren ?matchId=X&userId=Y&afterId=N" });
  }

  try {
    const [row] = await sql`
      SELECT id FROM matches
      WHERE  id = ${matchId}
        AND (user1_id = ${userId} OR user2_id = ${userId})
      LIMIT 1
    `;
    if (!row) {
      return res.status(403).json({ error: "No tienes acceso a este chat" });
    }

    const messages = await sql`
      SELECT id, match_id, sender_id, content, created_at
      FROM   messages
      WHERE  match_id = ${matchId}
        AND  id > ${afterId}
      ORDER  BY created_at ASC
    `;

    return res.status(200).json({ messages });
  } catch (err) {
    console.error("Poll error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
