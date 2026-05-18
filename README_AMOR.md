# Encuentra el amor 💘 — Guía de despliegue

Mini-Tinder para invitados de la boda. Backend en Vercel Serverless Functions, base de datos Neon Postgres y fotos en Cloudinary.

---

## 1. Variables de entorno

| Variable | Dónde se usa | Descripción |
|---|---|---|
| `DATABASE_URL` | Servidor (Vercel Functions) | Connection string de Neon Postgres |
| `MIGRATE_TOKEN` | Servidor (Vercel Functions) | Token aleatorio que protege `POST /api/migrate` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cliente (Vite build) | Cloud Name del dashboard de Cloudinary |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cliente (Vite build) | Nombre del upload preset sin firmar |

> **Nota:** las variables que empiezan por `VITE_` se incrustan en el bundle del cliente durante el build. Las demás solo están disponibles en las Functions del servidor.

### `.env.local` (desarrollo local)

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
MIGRATE_TOKEN=un-token-muy-secreto-y-largo
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=tu-upload-preset
```

El archivo `.env.example` en la raíz contiene la plantilla vacía. **Nunca subas `.env.local` al repositorio** (ya está en `.gitignore`).

---

## 2. Neon (base de datos Postgres)

### 2.1 Crear el proyecto

1. Entra en [neon.tech](https://neon.tech) y crea una cuenta (gratis).
2. Crea un nuevo **Project** → elige región (p. ej. `eu-west-1` para baja latencia desde España).
3. En el dashboard del proyecto, ve a **Connection Details**.
4. Copia la **Connection string** en formato `postgresql://...`. Asegúrate de que incluye `?sslmode=require`.

### 2.2 Añadir la variable en Vercel

Guarda ese string como `DATABASE_URL` (ver sección 4).

### 2.3 Ejecutar la migración (una sola vez)

Una vez desplegado en Vercel con las variables correctas, ejecuta:

```bash
curl -X POST https://<tu-dominio>.vercel.app/api/migrate \
  -H "x-migrate-token: <MIGRATE_TOKEN>"
```

Respuesta esperada:

```json
{ "ok": true, "message": "Migration complete" }
```

Esto crea las tablas `users`, `likes`, `matches` y `messages` con todos sus índices. Es idempotente — puedes ejecutarlo de nuevo sin problema.

---

## 3. Cloudinary (almacenamiento de fotos)

### 3.1 Crear cuenta

1. Entra en [cloudinary.com](https://cloudinary.com) y crea una cuenta gratuita.
2. En el **Dashboard** copia el valor **Cloud Name** (aparece arriba a la izquierda).

### 3.2 Crear un upload preset sin firmar

1. Ve a **Settings** (icono de engranaje) → pestaña **Upload**.
2. Baja hasta **Upload presets** → haz clic en **Add upload preset**.
3. Configura:
   - **Upload preset name**: el nombre que quieras (p. ej. `boda_amor`).
   - **Signing Mode**: **Unsigned**.
   - Opcionalmente, en **Folder** escribe `boda/amor` para organizar las fotos.
4. Guarda el preset y copia su nombre.

### 3.3 Añadir las variables en Vercel

- `VITE_CLOUDINARY_CLOUD_NAME` → el Cloud Name del paso 3.1
- `VITE_CLOUDINARY_UPLOAD_PRESET` → el nombre del preset del paso 3.2

---

## 4. Vercel (despliegue)

### 4.1 Añadir las variables de entorno

1. Abre el proyecto en [vercel.com](https://vercel.com).
2. Ve a **Project Settings** → **Environment Variables**.
3. Añade las siguientes variables marcando **Production** y **Preview** (y **Development** si quieres usarlo con `vercel dev`):

| Variable | Entornos |
|---|---|
| `DATABASE_URL` | Production, Preview, Development |
| `MIGRATE_TOKEN` | Production, Preview, Development |
| `VITE_CLOUDINARY_CLOUD_NAME` | Production, Preview, Development |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Production, Preview, Development |

### 4.2 Redesplegar

Después de añadir las variables, haz un redeploy para que el build las recoja:

- En el dashboard de Vercel → pestaña **Deployments** → menú `⋯` del último deployment → **Redeploy**.
- O haz un push vacío a la rama `tinder`:

```bash
git commit --allow-empty -m "chore: trigger redeploy with env vars"
git push origin tinder
```

### 4.3 Verificar `vercel.json`

El archivo ya está configurado correctamente. Las rutas `/api/*` van a las Serverless Functions y el resto al SPA:

```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 5. Smoke test post-deploy

Ejecuta estos pasos en orden después de cada despliegue.

### 5.1 Health check de la API

```bash
curl https://<tu-dominio>.vercel.app/api/health
```

✅ Respuesta esperada:

```json
{ "ok": true, "db": "connected" }
```

Si ves `"db": "error"`, revisa que `DATABASE_URL` esté bien configurada y que la migración se haya ejecutado.

### 5.2 Flujo de usuario completo

1. Abre la web en el navegador.
2. Ve al tab **Encuentra el amor 💘**.
3. Haz clic en **Crear cuenta**, rellena nombre, email y contraseña y regístrate.
4. Completa el **onboarding**: sube una foto, indica edad, género y a quién buscas.
5. Deberías llegar a la pantalla principal con el bottom nav (Mi Perfil / Buscar / Mensajes).

### 5.3 Comprobación de la cuenta atrás

- **Antes del 13 de junio de 2026 a las 12:00 (hora española):** la pestaña Buscar debe mostrar la cuenta atrás con días, horas, minutos y segundos.
- **Después de esa fecha:** debe aparecer la pila de tarjetas con candidatos.

> 💡 **Truco para testear antes de la fecha:** en `src/pages/EncuentraElAmor/tabs/Buscar.jsx` cambia temporalmente la constante:
> ```js
> const UNLOCK = new Date("2024-01-01T00:00:00+02:00"); // fecha pasada → acceso inmediato
> ```
> Recuerda revertirlo antes del despliegue final.

### 5.4 Smoke test de likes y match (con dos usuarios)

1. Abre la web en dos navegadores distintos (o uno normal y uno en privado).
2. Registra dos usuarios con géneros y preferencias compatibles.
3. Desde el usuario A, da like al usuario B.
4. Desde el usuario B, da like al usuario A.
5. ✅ Debe aparecer la animación de match con confetti.
6. Ve a **Mensajes** → debe aparecer el match con el mensaje icebreaker automático.
7. Abre el chat, envía un mensaje → debe aparecer en el otro navegador en ≤ 3 segundos (polling).

---

## Arquitectura rápida

```
BodaNacho/
├── api/                         # Vercel Serverless Functions (Node.js)
│   ├── _db.js                   # Cliente Neon
│   ├── _cors.js                 # Helpers CORS
│   ├── _icebreakers.js          # 25 frases para el primer mensaje de match
│   ├── schema.sql               # DDL completo (users, likes, matches, messages)
│   ├── health.js                # GET  /api/health
│   ├── migrate.js               # POST /api/migrate  (protegido por x-migrate-token)
│   ├── candidates.js            # GET  /api/candidates?userId=
│   ├── likes.js                 # POST /api/likes
│   ├── matches.js               # GET  /api/matches?userId=
│   ├── messages.js              # GET + POST /api/messages
│   ├── messages/poll.js         # GET  /api/messages/poll?matchId&userId&afterId=
│   └── auth/
│       ├── register.js          # POST /api/auth/register
│       ├── login.js             # POST /api/auth/login
│       └── me.js                # GET  /api/auth/me?userId=
└── src/pages/EncuentraElAmor/   # Feature React
    ├── AmorContext.jsx           # Contexto global + localStorage
    ├── api.js                   # Fetch helpers del cliente
    ├── cloudinary.js            # Upload + optimización de URLs
    ├── AuthScreen.jsx           # Login / Registro
    ├── Onboarding.jsx           # Setup de perfil inicial
    ├── AppInterior.jsx          # Shell con bottom nav
    └── tabs/
        ├── MiPerfil.jsx         # Editar perfil + logout
        ├── Buscar.jsx           # Countdown + CardStack
        ├── Mensajes.jsx         # Lista de matches
        └── Chat.jsx             # Conversación (polling cada 3s)
```

---

*Rama: `tinder` — última build: ✓ sin errores*
