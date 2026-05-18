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
    const matches = await sql`
      SELECT
        m.id                        AS "matchId",
        other.id                    AS "otherId",
        other.nombre                AS "otherNombre",
        other.foto_url              AS "otherFotoUrl",
        last_msg.id                 AS "lastMsgId",
        last_msg.content            AS "lastMsgContent",
        last_msg.created_at         AS "lastMsgAt",
        last_msg.sender_id          AS "lastMsgSenderId"
      FROM matches m
      JOIN users other
        ON other.id = CASE
             WHEN m.user1_id = ${userId} THEN m.user2_id
             ELSE m.user1_id
           END
      LEFT JOIN LATERAL (
        SELECT id, content, created_at, sender_id
        FROM   messages
        WHERE  match_id = m.id
        ORDER  BY created_at DESC
        LIMIT  1
      ) last_msg ON true
      WHERE m.user1_id = ${userId}
         OR m.user2_id = ${userId}
      ORDER BY last_msg.created_at DESC NULLS LAST
    `;

    const result = matches.map((row) => ({
      matchId:     row.matchId,
      otherUser: {
        id:       row.otherId,
        nombre:   row.otherNombre,
        foto_url: row.otherFotoUrl,
      },
      lastMessage: row.lastMsgId
        ? {
            id:         row.lastMsgId,
            content:    row.lastMsgContent,
            created_at: row.lastMsgAt,
            sender_id:  row.lastMsgSenderId,
          }
        : null,
    }));

    return res.status(200).json({ matches: result });
  } catch (err) {
    console.error("Matches error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
