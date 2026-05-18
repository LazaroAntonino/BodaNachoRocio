import { sql } from "./_db.js";
import { handlePreflight, setCors } from "./_cors.js";

async function verifyMembership(matchId, userId) {
  const [row] = await sql`
    SELECT id FROM matches
    WHERE  id = ${matchId}
      AND (user1_id = ${userId} OR user2_id = ${userId})
    LIMIT 1
  `;
  return !!row;
}

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  // ── GET — cargar todos los mensajes de un match ──────────
  if (req.method === "GET") {
    const matchId = parseInt(req.query?.matchId, 10);
    const userId  = parseInt(req.query?.userId,  10);

    if (!matchId || !userId) {
      return res.status(400).json({ error: "Se requieren ?matchId=X&userId=Y" });
    }

    try {
      const belongs = await verifyMembership(matchId, userId);
      if (!belongs) {
        return res.status(403).json({ error: "No tienes acceso a este chat" });
      }

      const messages = await sql`
        SELECT id, match_id, sender_id, content, created_at
        FROM   messages
        WHERE  match_id = ${matchId}
        ORDER  BY created_at ASC
      `;

      return res.status(200).json({ messages });
    } catch (err) {
      console.error("Messages GET error:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // ── POST — enviar un mensaje ──────────────────────────────
  if (req.method === "POST") {
    const { matchId, senderId, content } = req.body ?? {};

    if (!matchId || !senderId || !content) {
      return res.status(400).json({ error: "Se requieren matchId, senderId y content" });
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({ error: "El mensaje no puede estar vacío" });
    }
    if (content.length > 1000) {
      return res.status(400).json({ error: "El mensaje no puede superar 1000 caracteres" });
    }

    try {
      const belongs = await verifyMembership(matchId, senderId);
      if (!belongs) {
        return res.status(403).json({ error: "No tienes acceso a este chat" });
      }

      const [message] = await sql`
        INSERT INTO messages (match_id, sender_id, content)
        VALUES (${matchId}, ${senderId}, ${content.trim()})
        RETURNING id, match_id, sender_id, content, created_at
      `;

      return res.status(201).json({ message });
    } catch (err) {
      console.error("Messages POST error:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
