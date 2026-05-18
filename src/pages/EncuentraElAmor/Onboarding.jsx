import { useState } from "react";
import { useAmor } from "./AmorContext";
import * as api from "./api";
import { uploadPhoto } from "./cloudinary";

const DESC_MAX = 150;

export default function Onboarding() {
  const { user, setUser } = useAmor();

  const [fotoUrl, setFotoUrl]       = useState("");
  const [uploading, setUploading]   = useState(false);
  const [edad, setEdad]             = useState("");
  const [genero, setGenero]         = useState(""); // "hombre" | "mujer"
  const [busca, setBusca]           = useState(""); // "hombre" | "mujer" | "ambos"
  const [descripcion, setDesc]      = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const canSave = fotoUrl && edad && genero && busca && !uploading && !loading;

  // ── Subida de foto ──────────────────────────────────────
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

  // ── Guardar perfil ───────────────────────────────────────
  const handleSave = async () => {
    if (!canSave) return;
    setError("");
    setLoading(true);
    try {
      const { user: updated } = await api.updateProfile(user.id, {
        foto_url: fotoUrl,
        edad: Number(edad),
        genero,
        busca,
        descripcion,
      });
      setUser(updated); // onboarding_completado=true → AmorRouter navega a AppInterior
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amor-onboarding-wrapper">
      <h2 className="amor-title" style={{ marginBottom: 0 }}>Tu perfil 💘</h2>

      {/* ── Foto ── */}
      <div className="amor-onboarding-section">
        <span className="amor-onboarding-label">Sube tu mejor foto 📸</span>
        <div className="amor-photo-area">
          <div className="amor-photo-preview-wrap">
            {fotoUrl ? (
              <img src={fotoUrl} alt="Tu foto" className="amor-photo-preview" />
            ) : (
              <div className="amor-photo-placeholder">📷</div>
            )}
            {uploading && (
              <div className="amor-photo-spinner">
                <div className="amor-spinner" />
              </div>
            )}
          </div>
          <label className="amor-file-label" htmlFor="amor-file-input">
            {fotoUrl ? "Cambiar foto" : "Elegir foto"}
          </label>
          <input
            id="amor-file-input"
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      </div>

      {/* ── Edad ── */}
      <div className="amor-onboarding-section">
        <label className="amor-onboarding-label" htmlFor="amor-edad">Edad</label>
        <input
          id="amor-edad"
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

      {/* ── Género ── */}
      <div className="amor-onboarding-section">
        <span className="amor-onboarding-label">Soy…</span>
        <div className="amor-pill-group">
          {["hombre", "mujer"].map((g) => (
            <button
              key={g}
              className={`amor-pill${genero === g ? " selected" : ""}`}
              onClick={() => setGenero(g)}
              type="button"
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
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
        <label className="amor-onboarding-label" htmlFor="amor-desc">
          Cuéntanos algo de ti{" "}
          <span style={{ fontWeight: 400, fontSize: "0.88rem" }}>(opcional)</span>
        </label>
        <div className="amor-textarea-wrap">
          <textarea
            id="amor-desc"
            className="amor-textarea"
            maxLength={DESC_MAX}
            placeholder="Ej: Me encanta bailar, los perros y el tiramisú…"
            value={descripcion}
            onChange={(e) => setDesc(e.target.value)}
          />
          <span className="amor-textarea-counter">
            {descripcion.length} / {DESC_MAX}
          </span>
        </div>
      </div>

      {/* ── Error ── */}
      {error && <p className="amor-error">{error}</p>}

      {/* ── Guardar ── */}
      <button
        className="amor-btn-save"
        onClick={handleSave}
        disabled={!canSave}
        type="button"
      >
        {loading ? "Guardando…" : "Guardar perfil"}
      </button>
    </div>
  );
}
