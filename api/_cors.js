/**
 * Helper CORS reutilizable para todas las serverless functions.
 * Uso:
 *   import { setCors, handlePreflight } from "../_cors.js";
 *   if (handlePreflight(req, res)) return;
 *   setCors(res);
 */

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-migrate-token");
}

/** Responde al preflight OPTIONS y devuelve true para que el handler haga return. */
export function handlePreflight(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
