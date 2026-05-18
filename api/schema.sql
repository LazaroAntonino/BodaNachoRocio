-- ============================================================
-- BodaNacho · "Encuentra el amor" · Schema SQL
-- Idempotente: usa CREATE TABLE IF NOT EXISTS
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id                    SERIAL PRIMARY KEY,
  nombre                TEXT NOT NULL,
  email                 TEXT UNIQUE NOT NULL,
  password              TEXT NOT NULL,
  foto_url              TEXT,
  edad                  INT,
  genero                TEXT CHECK (genero IN ('hombre', 'mujer')),
  busca                 TEXT CHECK (busca IN ('hombre', 'mujer', 'ambos')),
  descripcion           TEXT,
  onboarding_completado BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes (
  id           SERIAL PRIMARY KEY,
  from_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  es_like      BOOLEAN NOT NULL,   -- TRUE = like, FALSE = dislike (nope)
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (from_user_id, to_user_id)
);

-- user1_id SIEMPRE < user2_id: garantiza que el par (A,B) es único
-- y evita duplicados (A,B) y (B,A) sin necesidad de lógica extra.
CREATE TABLE IF NOT EXISTS matches (
  id         SERIAL PRIMARY KEY,
  user1_id   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2_id   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (user1_id < user2_id),
  UNIQUE (user1_id, user2_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  match_id   INT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id  INT NOT NULL REFERENCES users(id),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Índices
-- ============================================================

-- ¿Quién me ha dado like? (para detectar match al instante)
CREATE INDEX IF NOT EXISTS idx_likes_to_user
  ON likes (to_user_id);

-- Listar mis matches rápido (busco en ambas columnas)
CREATE INDEX IF NOT EXISTS idx_matches_user1
  ON matches (user1_id);

CREATE INDEX IF NOT EXISTS idx_matches_user2
  ON matches (user2_id);

-- Cargar chat ordenado cronológicamente
CREATE INDEX IF NOT EXISTS idx_messages_match_time
  ON messages (match_id, created_at);
