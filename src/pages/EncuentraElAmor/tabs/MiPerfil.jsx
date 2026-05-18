import { useState, useRef } from "react";
import { useAmor } from "../AmorContext";
import * as api from "../api";
import { uploadPhoto } from "../cloudinary";

const DESC_MAX = 150;

export default function MiPerfil() {
  const { user, setUser, logout } = useAmor();

  const [fotoUrl, setFotoUrl]     = useState(user.foto_url   ?? "");
  const [nombre, setNombre]       = useState(user.nombre     ?? "");
  const [edad, setEdad]           = useState(user.edad       ?? "");
  const [busca, setBusca]         = useState(user.busca      ?? "");
  const [descripcion, setDesc]    = useState(user.descripcion ?? "");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [saved, setSaved]         = useState(false);

  const savedTimer = useRef(null);

  // ── Cambio de foto ──────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadPhoto(file);
      setFotoUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ── Guardar cambios ──────────────────────────────────────
  const handleSave = async () => {
    if (!nombre || !edad || !busca || uploading || loading) return;
    setError("");
    setLoading(true);
    try {
      const { user: updated } = await api.updateProfile(user.id, {
        foto_url: fotoUrl,
        edad: Number(edad),
        genero: user.genero,   // género propio no se edita
        busca,
        descripcion,
        nombre,
      });
      setUser(updated);
      // Mensaje "✓ Guardado" durante 3 s
      setSaved(true);
      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const canSave = nombre && edad && busca && fotoUrl && !uploading && !loading;

  return (
    <div className="amor-onboarding-wrapper">
      <h2 className="amor-title" style={{ marginBottom: 0 }}>Mi perfil 👤</h2>

      {/* ── Foto ── */}
      <div className="amor-onboarding-section" style={{ alignItems: "center" }}>
        <div className="amor-photo-area">
          <div className="amor-photo-preview-wrap" style={{ width: 140, height: 140 }}>
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt="Tu foto"
                className="amor-photo-preview"
                style={{ width: 140, height: 140 }}
              />
            ) : (
              <div className="amor-photo-placeholder" style={{ width: 140, height: 140 }}>📷</div>
            )}
            {uploading && (
              <div className="amor-photo-spinner">
                <div className="amor-spinner" />
              </div>
            )}
          </div>
          <label className="amor-file-label" htmlFor="perfil-file-input">
            {uploading ? "Subiendo…" : "Cambiar foto"}
          </label>
          <input
            id="perfil-file-input"
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      </div>

      {/* ── Nombre ── */}
      <div className="amor-onboarding-section">
        <label className="amor-onboarding-label" htmlFor="perfil-nombre">Nombre</label>
        <input
          id="perfil-nombre"
          className="amor-input"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          autoComplete="name"
        />
      </div>

      {/* ── Edad ── */}
      <div className="amor-onboarding-section">
        <label className="amor-onboarding-label" htmlFor="perfil-edad">Edad</label>
        <input
          id="perfil-edad"
          className="amor-input"
          type="number"
          min={18}
          max={99}
          placeholder="Tu edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          inputMode="numeric"
        />
      </div>

      {/* ── Busca ── */}
      <div className="amor-onboarding-section">
        <span className="amor-onboarding-label">Busco…</span>
        <div className="amor-pill-group">
          {[
            { value: "hombre", label: "Hombre" },
            { value: "mujer",  label: "Mujer"  },
            { value: "ambos",  label: "Ambos"  },
          ].map(({ value, label }) => (
            <button
              key={value}
              className={`amor-pill${busca === value ? " selected" : ""}`}
              onClick={() => setBusca(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Descripción ── */}
      <div className="amor-onboarding-section">
        <label className="amor-onboarding-label" htmlFor="perfil-desc">
          Sobre mí{" "}
          <span style={{ fontWeight: 400, fontSize: "0.88rem" }}>(opcional)</span>
        </label>
        <div className="amor-textarea-wrap">
          <textarea
            id="perfil-desc"
            className="amor-textarea"
            maxLength={DESC_MAX}
            placeholder="Cuéntanos algo de ti…"
            value={descripcion}
            onChange={(e) => setDesc(e.target.value)}
          />
          <span className="amor-textarea-counter">
            {descripcion.length} / {DESC_MAX}
          </span>
        </div>
      </div>

      {/* ── Feedback ── */}
      {error && <p className="amor-error">{error}</p>}
      {saved && (
        <p style={{
          color: "#2e7d52",
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.95rem",
          textAlign: "center",
          margin: 0,
        }}>
          ✓ Guardado
        </p>
      )}

      {/* ── Guardar ── */}
      <button
        className="amor-btn-save"
        onClick={handleSave}
        disabled={!canSave}
        type="button"
      >
        {loading ? "Guardando…" : "Guardar cambios"}
      </button>

      {/* ── Cerrar sesión ── */}
      <button
        type="button"
        onClick={logout}
        style={{
          background: "none",
          border: "none",
          color: "#b00020",
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.97rem",
          cursor: "pointer",
          padding: "0.5rem 1rem",
          minHeight: 44,
          marginTop: "0.5rem",
          opacity: 0.8,
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
