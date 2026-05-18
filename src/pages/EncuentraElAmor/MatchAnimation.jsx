import { useMemo } from "react";
import { useAmor } from "./AmorContext";
import { cloudinaryUrl } from "./cloudinary";

const EMOJIS  = ["❤️", "💘", "💕", "💗", "💖"];
const N_PIECES = 18;

// Genera los datos de confetti una sola vez por montaje
function useConfetti() {
  return useMemo(() => (
    Array.from({ length: N_PIECES }, (_, i) => ({
      id:       i,
      emoji:    EMOJIS[i % EMOJIS.length],
      left:     `${Math.random() * 96}%`,
      fontSize: `${1 + Math.random() * 1.2}rem`,
      duration: `${2.8 + Math.random() * 3.2}s`,
      delay:    `${Math.random() * 3}s`,
    }))
  ), []);
}

/**
 * Props:
 *   otherUser  { id, nombre, foto_url }
 *   matchId    number
 *   onClose    () => void          — "Seguir buscando"
 *   onOpenChat (matchId) => void   — "Ver chat"
 */
export default function MatchAnimation({ otherUser, matchId, onClose, onOpenChat }) {
  const { user } = useAmor();
  const confetti = useConfetti();

  return (
    <div className="amor-match-overlay" role="dialog" aria-modal="true" aria-label="¡Es un match!">

      {/* Confetti */}
      <div className="amor-confetti" aria-hidden="true">
        {confetti.map(({ id, emoji, left, fontSize, duration, delay }) => (
          <span
            key={id}
            className="amor-confetti-piece"
            style={{ left, fontSize, animationDuration: duration, animationDelay: delay }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Contenido central */}
      <div className="amor-match-content">

        {/* Título */}
        <h2 className="amor-match-title">¡ES UN MATCH!</h2>

        {/* Fotos */}
        <div className="amor-match-photos">
          {user.foto_url ? (
            <img
              className="amor-match-avatar"
              src={cloudinaryUrl(user.foto_url, "avatar")}
              alt={user.nombre}
            />
          ) : (
            <div className="amor-match-avatar amor-match-avatar--placeholder">
              <i className="fa-solid fa-user" />
            </div>
          )}
          <span className="amor-match-heart" aria-hidden="true">❤️</span>
          {otherUser.foto_url ? (
            <img
              className="amor-match-avatar"
              src={cloudinaryUrl(otherUser.foto_url, "avatar")}
              alt={otherUser.nombre}
              loading="lazy"
            />
          ) : (
            <div className="amor-match-avatar amor-match-avatar--placeholder">
              <i className="fa-solid fa-user" />
            </div>
          )}
        </div>

        {/* Nombres */}
        <p className="amor-match-names">
          {user.nombre} &amp; {otherUser.nombre}
        </p>

        {/* Botones */}
        <div className="amor-match-btns">
          <button
            className="amor-match-btn-primary"
            onClick={() => onOpenChat(matchId)}
            type="button"
          >
            💬 Ver chat
          </button>
          <button
            className="amor-match-btn-secondary"
            onClick={onClose}
            type="button"
          >
            Seguir buscando
          </button>
        </div>

      </div>
    </div>
  );
}
