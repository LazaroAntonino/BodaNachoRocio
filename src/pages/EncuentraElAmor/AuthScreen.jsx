import { useState } from "react";
import { useAmor } from "./AmorContext";
import * as api from "./api";

export default function AuthScreen() {
  const { setUser } = useAmor();
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Campos
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleTabChange = (t) => {
    setTab(t);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data;
      if (tab === "register") {
        data = await api.register({ nombre, email, password });
      } else {
        data = await api.login({ email, password });
      }
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amor-auth-wrapper">
      <h1 className="amor-title">Encuentra el amor 💘</h1>

      {/* Tab switch */}
      <div className="amor-tab-switch" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "login"}
          className={`amor-tab-btn${tab === "login" ? " active" : ""}`}
          onClick={() => handleTabChange("login")}
        >
          Iniciar sesión
        </button>
        <button
          role="tab"
          aria-selected={tab === "register"}
          className={`amor-tab-btn${tab === "register" ? " active" : ""}`}
          onClick={() => handleTabChange("register")}
        >
          Registrarse
        </button>
      </div>

      {/* Formulario */}
      <form className="amor-form" onSubmit={handleSubmit} noValidate>
        {tab === "register" && (
          <input
            className="amor-input"
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
          />
        )}
        <input
          className="amor-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          inputMode="email"
        />
        <input
          className="amor-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={tab === "register" ? "new-password" : "current-password"}
        />

        <button
          className="amor-btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Entrando..."
            : tab === "register"
            ? "Crear cuenta"
            : "Entrar"}
        </button>

        {error && <p className="amor-error">{error}</p>}
      </form>
    </div>
  );
}
