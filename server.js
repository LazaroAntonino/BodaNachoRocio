import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Route handlers
import health from "./api/health.js";
import register from "./api/auth/register.js";
import login from "./api/auth/login.js";
import me from "./api/auth/me.js";
import profile from "./api/users/profile.js";
import candidates from "./api/candidates.js";
import likes from "./api/likes.js";
import matches from "./api/matches.js";
import messages from "./api/messages.js";
import poll from "./api/messages/poll.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// Parse JSON bodies
app.use(express.json());

// ── API routes ──────────────────────────────────────────────
app.all("/api/health",           health);
app.all("/api/auth/register",    register);
app.all("/api/auth/login",       login);
app.all("/api/auth/me",          me);
app.all("/api/users/profile",    profile);
app.all("/api/candidates",       candidates);
app.all("/api/likes",            likes);
app.all("/api/matches",          matches);
app.all("/api/messages",         messages);
app.all("/api/messages/poll",    poll);

// ── Serve React SPA ─────────────────────────────────────────
const distDir = join(__dirname, "dist");
app.use(express.static(distDir));

// SPA fallback – send index.html for every non-API route
// Express 5 requires a named wildcard parameter (not bare "*")
app.get("/{*splat}", (req, res) => {
    res.sendFile(join(distDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅  Servidor escuchando en http://localhost:${PORT}`);
});
