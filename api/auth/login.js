import { sql } from "../_db.js";
import { handlePreflight, setCors } from "../_cors.js";

export default async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios: email, password" });
  }

  try {
    const [user] = await sql`
      SELECT id, nombre, email, onboarding_completado,
             foto_url, edad, genero, busca, descripcion
      FROM   users
      WHERE  email    = ${email}
      AND    password = ${password}
      LIMIT  1
    `;

    if (!user) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
