import { useState, useEffect, useCallback } from "react";
import { useAmor } from "../AmorContext";
import * as api from "../api";
import Chat from "./Chat";
import { cloudinaryUrl } from "../cloudinary";

// ── Fecha relativa ────────────────────────────────────────
function relativeTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  <  1) return "ahora";
  if (mins  < 60) return `hace ${mins}m`;
  if (hours < 24) return `hace ${hours}h`;
  if (days  === 1) return "ayer";
  // Si es del mismo año, muestra "13 jun", si no, "13/06/25"
  const d = new Date(dateStr);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  if (sameYear) {
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  }
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

// ── Lista de matches ──────────────────────────────────────
function MatchList({ matches, onSelect, userId }) {
  if (matches.length === 0) {
    return (
      <div className="amor-mensajes-empty">
        Todavía no tienes matches 💔<br />— sigue buscando
      </div>
    );
  }

  return (
    <ul className="amor-match-list">
      {matches.map((m) => {
        const isUnread =
          m.lastMessage && m.lastMessage.sender_id !== userId;

        return (
          <li
            key={m.matchId}
            className="amor-match-item"
            onClick={() => onSelect(m)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(m)}
            aria-label={`Chat con ${m.otherUser.nombre}`}
          >
            {/* Avatar */}
            {m.otherUser.foto_url ? (
              <img
                className="amor-match-item-avatar"
                src={cloudinaryUrl(m.otherUser.foto_url, "thumb")}
                alt={m.otherUser.nombre}
                loading="lazy"
              />
            ) : (
              <div className="amor-match-item-avatar amor-match-item-avatar--placeholder">
                <i className="fa-solid fa-user" />
              </div>
            )}

            {/* Nombre + preview */}
            <div className="amor-match-item-body">
              <p className={`amor-match-item-name${isUnread ? " unread" : ""}`}>
                {m.otherUser.nombre}
              </p>
              <p className={`amor-match-item-preview${isUnread ? " unread" : ""}`}>
                {m.lastMessage
                  ? (m.lastMessage.sender_id === userId ? "Tú: " : "") + m.lastMessage.content
                  : "¡Nuevo match! Di hola 👋"}
              </p>
            </div>

            {/* Fecha + dot */}
            <div className="amor-match-item-right">
              <span className={`amor-match-item-time${isUnread ? " unread" : ""}`}>
                {relativeTime(m.lastMessage?.created_at)}
              </span>
              {isUnread && <span className="amor-unread-dot" aria-hidden="true" />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ── Componente principal ──────────────────────────────────
export default function Mensajes({ openMatchId, onChatOpened }) {
  const { user } = useAmor();
  const [matches, setMatches]             = useState([]);
  const [loading, setLoading]             = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const loadMatches = useCallback(async () => {
    setLoading(true);
    try {
      const { matches: data } = await api.getMatches(user.id);
      setMatches(data);
      return data;
    } catch (_) {
      setMatches([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  // Carga inicial
  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  // Si venimos de MatchAnimation con un matchId concreto, abrirlo directamente
  useEffect(() => {
    if (!openMatchId || matches.length === 0) return;
    const target = matches.find((m) => m.matchId === openMatchId);
    if (target) {
      setSelectedMatch(target);
      onChatOpened?.();
    }
  }, [openMatchId, matches, onChatOpened]);

  // Volver de chat: refresca la lista para actualizar previews
  const handleBack = () => {
    setSelectedMatch(null);
    loadMatches();
  };

  // Pantalla de chat abierto
  if (selectedMatch) {
    return <Chat match={selectedMatch} onBack={handleBack} />;
  }

  return (
    <div className="amor-mensajes-wrapper">
      <header className="amor-mensajes-header">
        <h2 className="amor-mensajes-title">Mensajes</h2>
      </header>

      {loading ? (
        <div className="amor-buscar-loading">
          <div className="amor-spinner" style={{ width: 40, height: 40, borderWidth: 4 }} />
        </div>
      ) : (
        <MatchList matches={matches} onSelect={setSelectedMatch} userId={user.id} />
      )}
    </div>
  );
}
