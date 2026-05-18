import { useState, useEffect, useCallback } from "react";
import { useAmor } from "../AmorContext";
import * as api from "../api";
import MatchAnimation from "../MatchAnimation";
import { cloudinaryUrl } from "../cloudinary";

const UNLOCK = new Date("2026-06-13T12:00:00+02:00");
const UNLOCK_REAL = UNLOCK; // para restaurar después
// TEST: desbloquear siempre (comentar esta línea en producción)
const UNLOCK_TEST = new Date(0);

// ── Cuenta atrás ─────────────────────────────────────────

function getTimeLeft() {
  const diff = UNLOCK.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 1000 / 60 / 60 / 24),
    hours:   Math.floor(diff / 1000 / 60 / 60) % 24,
    minutes: Math.floor(diff / 1000 / 60) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const boxes = [
    { num: timeLeft.days,    lbl: "Días"  },
    { num: timeLeft.hours,   lbl: "Horas" },
    { num: timeLeft.minutes, lbl: "Min"   },
    { num: timeLeft.seconds, lbl: "Seg"   },
  ];

  return (
    <div className="amor-countdown-wrapper">
      <h2 className="amor-countdown-title">
        Pronto podrás conocer a alguien especial...
      </h2>
      <span className="amor-countdown-emoji" aria-hidden="true">💘</span>
      <div className="amor-countdown-grid">
        {boxes.map(({ num, lbl }) => (
          <div key={lbl} className="amor-countdown-box">
            <span className="amor-countdown-num">{String(num).padStart(2, "0")}</span>
            <span className="amor-countdown-lbl">{lbl}</span>
          </div>
        ))}
      </div>
      <p className="amor-countdown-footer">
        El amor llegará el 13 de Junio a las 12:00 🕊️
      </p>
    </div>
  );
}

// ── CardStack ─────────────────────────────────────────────

function CardStack({ onOpenChat }) {
  const { user } = useAmor();
  const [cards, setCards]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [flyDir, setFlyDir]   = useState(null); // "left" | "right"
  const [acting, setActing]   = useState(false);
  const [match, setMatch]     = useState(null);

  const loadCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const { candidates } = await api.getCandidates(user.id);
      setCards(candidates);
    } catch (_) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadCandidates(); }, [loadCandidates]);

  const handleAction = async (esLike) => {
    if (acting || cards.length === 0) return;
    const target = cards[0];
    setActing(true);
    setFlyDir(esLike ? "right" : "left");

    // Animación y llamada API en paralelo
    const [resp] = await Promise.all([
      api.likeUser(user.id, target.id, esLike).catch(() => ({ match: false })),
      new Promise((r) => setTimeout(r, 350)),
    ]);

    setCards((prev) => prev.slice(1));
    setFlyDir(null);
    setActing(false);

    if (resp.match) {
      setMatch({ otherUser: resp.otherUser, matchId: resp.matchId });
    }
  };

  if (match) {
    return (
      <MatchAnimation
        otherUser={match.otherUser}
        matchId={match.matchId}
        onClose={() => setMatch(null)}
        onOpenChat={onOpenChat}
      />
    );
  }

  if (loading) {
    return (
      <div className="amor-buscar-loading">
        <div className="amor-spinner amor-spinner--lg" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="amor-buscar-empty">
        <p>Has visto a todos los invitados disponibles 💘<br />— vuelve más tarde</p>
        <button className="amor-btn-primary" onClick={loadCandidates} type="button">
          Recargar
        </button>
      </div>
    );
  }

  return (
    <div className="amor-buscar-wrapper">

      {/* Stack de tarjetas */}
      <div className="amor-card-stack">

        {/* Tarjeta 3 (fondo, más atrás) */}
        {cards[2] && (
          <div className="amor-card amor-card--behind-2" aria-hidden="true">
            <img
              className="amor-card-img"
              src={cloudinaryUrl(cards[2].foto_url, "card")}
              alt=""
              draggable={false}
            />
          </div>
        )}

        {/* Tarjeta 2 (fondo, justo detrás) */}
        {cards[1] && (
          <div className="amor-card amor-card--behind-1" aria-hidden="true">
            <img
              className="amor-card-img"
              src={cloudinaryUrl(cards[1].foto_url, "card")}
              alt=""
              draggable={false}
            />
          </div>
        )}

        {/* Tarjeta activa */}
        <div className={`amor-card amor-card--active${flyDir ? ` amor-card--fly-${flyDir}` : ""}`}>
          <img
            className="amor-card-img"
            src={cloudinaryUrl(cards[0].foto_url, "card")}
            alt={cards[0].nombre}
            draggable={false}
          />
          <div className="amor-card-overlay" />

          {/* Badges LIKE / NOPE visibles durante la animación */}
          {flyDir === "right" && (
            <div className="amor-card-badge amor-card-badge--like">LIKE ❤️</div>
          )}
          {flyDir === "left" && (
            <div className="amor-card-badge amor-card-badge--nope">NOPE ✕</div>
          )}

          <div className="amor-card-info">
            <p className="amor-card-name">{cards[0].nombre}, {cards[0].edad}</p>
            {cards[0].descripcion && (
              <p className="amor-card-desc">{cards[0].descripcion}</p>
            )}
          </div>
        </div>
      </div>

      {/* Botones acción */}
      <div className="amor-action-btns">
        <button
          className="amor-btn-action amor-btn-dislike"
          onClick={() => handleAction(false)}
          disabled={acting}
          aria-label="No me interesa"
          type="button"
        >
          ✕
        </button>
        <button
          className="amor-btn-action amor-btn-like"
          onClick={() => handleAction(true)}
          disabled={acting}
          aria-label="Me gusta"
          type="button"
        >
          ❤️
        </button>
      </div>

    </div>
  );
}

// ── Export ────────────────────────────────────────────────

export default function Buscar({ onOpenChat }) {
  const [unlocked, setUnlocked] = useState(() => Date.now() >= UNLOCK_TEST.getTime());

  useEffect(() => {
    if (unlocked) return;
    const id = setInterval(() => {
      if (Date.now() >= UNLOCK_TEST.getTime()) {
        setUnlocked(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [unlocked]);

  return unlocked ? <CardStack onOpenChat={onOpenChat} /> : <Countdown />;
}
