import { sql } from "../_db.js";
import { handlePreflight, setCors } from "../_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, foto_url, edad, genero, busca, descripcion, nombre } = req.body ?? {};

  if (!userId) {
    return res.status(400).json({ error: "Se requiere userId" });
  }
  if (!foto_url || !edad || !genero || !busca) {
    return res.status(400).json({ error: "Faltan campos obligatorios: foto_url, edad, genero, busca" });
  }

  try {
    const [user] = await sql`
      UPDATE users
      SET
        foto_url              = ${foto_url},
        edad                  = ${Number(edad)},
        genero                = ${genero},
        busca                 = ${busca},
        descripcion           = ${descripcion ?? null},
        nombre                = COALESCE(${nombre ?? null}, nombre),
        onboarding_completado = true
      WHERE id = ${userId}
      RETURNING
        id, nombre, email, foto_url, edad, genero, busca,
        descripcion, onboarding_completado, created_at
    `;

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Profile update error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
