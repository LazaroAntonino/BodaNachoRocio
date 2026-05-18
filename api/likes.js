import { sql } from "./_db.js";
import { handlePreflight, setCors } from "./_cors.js";
import { ICEBREAKERS } from "./_icebreakers.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fromUserId, toUserId, esLike } = req.body ?? {};

  if (!fromUserId || !toUserId || esLike === undefined) {
    return res.status(400).json({ error: "Se requieren fromUserId, toUserId y esLike" });
  }

  try {
    await sql`
      INSERT INTO likes (from_user_id, to_user_id, es_like)
      VALUES (${fromUserId}, ${toUserId}, ${esLike})
      ON CONFLICT (from_user_id, to_user_id) DO NOTHING
    `;

    if (!esLike) {
      return res.status(200).json({ match: false });
    }

    const [reciprocal] = await sql`
      SELECT id FROM likes
      WHERE  from_user_id = ${toUserId}
        AND  to_user_id   = ${fromUserId}
        AND  es_like      = true
      LIMIT 1
    `;

    if (!reciprocal) {
      return res.status(200).json({ match: false });
    }

    const user1Id = Math.min(fromUserId, toUserId);
    const user2Id = Math.max(fromUserId, toUserId);

    // Si el match ya existía (reintento de red / doble llamada), devolver sin crear duplicado
    const [existingMatch] = await sql`
      SELECT id FROM matches
      WHERE  user1_id = ${user1Id}
        AND  user2_id = ${user2Id}
      LIMIT 1
    `;

    if (existingMatch) {
      const [otherUser] = await sql`
        SELECT id, nombre, foto_url FROM users WHERE id = ${toUserId} LIMIT 1
      `;
      return res.status(200).json({ match: true, matchId: existingMatch.id, otherUser });
    }

    const icebreaker = ICEBREAKERS[Math.floor(Math.random() * ICEBREAKERS.length)];

    const [matchRow] = await sql`
      WITH ins_match AS (
        INSERT INTO matches (user1_id, user2_id)
        VALUES (${user1Id}, ${user2Id})
        RETURNING id
      )
      INSERT INTO messages (match_id, sender_id, content)
      SELECT id, ${fromUserId}, ${icebreaker}
      FROM   ins_match
      RETURNING match_id AS id
    `;

    const [otherUser] = await sql`
      SELECT id, nombre, foto_url
      FROM   users
      WHERE  id = ${toUserId}
      LIMIT  1
    `;

    return res.status(200).json({
      match:     true,
      matchId:   matchRow.id,
      otherUser,
    });
  } catch (err) {
    console.error("Likes error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
