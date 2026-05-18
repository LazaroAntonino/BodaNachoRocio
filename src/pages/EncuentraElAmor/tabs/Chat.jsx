import { useEffect, useRef, useState, useCallback } from "react";
import { useAmor } from "../AmorContext";
import * as api from "../api";
import { cloudinaryUrl } from "../cloudinary";

const POLL_INTERVAL = 3000;

function formatTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

/** Group consecutive messages by the same sender */
function groupMessages(messages) {
  const groups = [];
  messages.forEach((msg) => {
    const last = groups[groups.length - 1];
    if (last && last.senderId === msg.sender_id) {
      last.msgs.push(msg);
    } else {
      groups.push({ senderId: msg.sender_id, msgs: [msg] });
    }
  });
  return groups;
}

export default function Chat({ match, onBack }) {
  const { user } = useAmor();
  const { matchId, otherUser } = match;

  const [messages, setMessages] = useState(null); // null = loading
  const [loaded, setLoaded] = useState(false);    // true tras la primera carga
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const lastIdRef = useRef(0);
  const pollingRef = useRef(null);

  // ── Scroll to bottom ──────────────────────────────────────────────────────────
  const scrollToBottom = useCallback((smooth = false) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  }, []);

  // ── Load initial messages ─────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setMessages(null);
    setLoaded(false);
    lastIdRef.current = 0;
    (async () => {
      try {
        const data = await api.getMessages(matchId, user.id);
        if (cancelled) return;
        const msgs = data.messages ?? [];
        setMessages(msgs);
        lastIdRef.current = msgs.length ? msgs[msgs.length - 1].id : 0;
      } catch {
        if (!cancelled) setMessages([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [matchId, user.id]);

  // Scroll tras la primera carga
  useEffect(() => {
    if (loaded) scrollToBottom(false);
  }, [loaded, scrollToBottom]);

  // ── Polling — arranca solo cuando loaded=true ─────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    pollingRef.current = setInterval(async () => {
      try {
        const data = await api.pollMessages(matchId, user.id, lastIdRef.current);
        const newMsgs = data.messages ?? [];
        if (newMsgs.length === 0) return;
        lastIdRef.current = newMsgs[newMsgs.length - 1].id;
        setMessages((prev) => [...(prev ?? []), ...newMsgs]);
        // scroll solo si el usuario está cerca del final (< 150px)
        const list = bottomRef.current?.parentElement;
        if (list) {
          const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 150;
          if (nearBottom) scrollToBottom(true);
        }
      } catch {
        // silent — reintenta en el siguiente tick
      }
    }, POLL_INTERVAL);

    return () => clearInterval(pollingRef.current);
  }, [loaded, matchId, user.id, scrollToBottom]);

  // ── Auto-resize textarea ──────────────────────────────────────────────────────
  const handleTextChange = (e) => {
    const el = e.target;
    el.style.height = "auto";
    const lineH = parseFloat(getComputedStyle(el).lineHeight) || 22;
    const maxH = lineH * 4 + 18;
    const newH = Math.min(el.scrollHeight, maxH);
    el.style.height = newH + "px";
    // Solo mostrar scrollbar cuando se alcanza el límite de altura
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
    setText(el.value);
  };

  // ── Send message ──────────────────────────────────────────────────────────────
  const handleSend = async () => {
    const content = text.trim();
    if (!content || sending) return;

    const tmpId = `tmp-${Date.now()}`;
    const tmpMsg = {
      id: tmpId,
      sender_id: user.id,
      content,
      created_at: new Date().toISOString(),
      _tmp: true,
    };

    // Optimistic update
    setMessages((prev) => [...(prev ?? []), tmpMsg]);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setTimeout(() => scrollToBottom(true), 50);

    setSending(true);
    try {
      const data = await api.sendMessage(matchId, user.id, content);
      const real = data.message;
      lastIdRef.current = real.id;
      setMessages((prev) =>
        (prev ?? []).map((m) => (m.id === tmpId ? real : m))
      );
    } catch {
      // Remove the optimistic message on failure and restore text
      setMessages((prev) => (prev ?? []).filter((m) => m.id !== tmpId));
      setText(content);
    } finally {
      setSending(false);
    }
  };

  // Enter to send (Shift+Enter = new line)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  const groups = messages ? groupMessages(messages) : [];

  return (
    <div className="amor-chat-wrapper">
      {/* ── Header ── */}
      <header className="amor-chat-header">
        <button
          className="amor-chat-back-btn"
          onClick={onBack}
          aria-label="Volver a mensajes"
        >
          <i className="fa-solid fa-arrow-left" />
        </button>

        {otherUser.foto_url ? (
          <img
            className="amor-chat-header-avatar"
            src={cloudinaryUrl(otherUser.foto_url, "avatar")}
            alt={otherUser.nombre}
            loading="lazy"
          />
        ) : (
          <div className="amor-chat-header-avatar-placeholder">
            <i className="fa-solid fa-user" />
          </div>
        )}

        <div className="amor-chat-header-info">
          <p className="amor-chat-header-name">{otherUser.nombre}</p>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className="amor-chat-messages">
        {messages === null && (
          <div className="amor-chat-loading">
            <div className="spinner-border spinner-border-sm" role="status" />
          </div>
        )}

        {messages !== null && messages.length === 0 && (
          <div className="amor-chat-empty">
            <i className="fa-solid fa-heart fa-2x" style={{ color: "var(--azul-crema-acento)" }} />
            <p>¡Es un match! Sé el primero en decir hola 👋</p>
          </div>
        )}

        {groups.map((group, gi) => {
          const isMine = group.senderId === user.id;
          const lastMsg = group.msgs[group.msgs.length - 1];
          return (
            <div
              key={`group-${gi}`}
              className="amor-chat-bubble-group"
            >
              {group.msgs.map((msg) => (
                <div
                  key={msg.id}
                  className={`amor-chat-bubble-row amor-chat-bubble-row--${isMine ? "mine" : "theirs"}`}
                >
                  <div
                    className={[
                      "amor-chat-bubble",
                      isMine ? "amor-chat-bubble--mine" : "amor-chat-bubble--theirs",
                      msg._tmp ? "amor-chat-bubble--tmp" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* Timestamp under last bubble of each group */}
              <span
                className={`amor-chat-group-time amor-chat-group-time--${isMine ? "mine" : "theirs"}`}
              >
                {formatTime(lastMsg.created_at)}
              </span>
            </div>
          );
        })}

        <div ref={bottomRef} style={{ height: 1 }} />
      </div>

      {/* ── Footer / Input ── */}
      <footer className="amor-chat-footer">
        <textarea
          ref={textareaRef}
          className="amor-chat-textarea"
          placeholder="Escribe un mensaje…"
          rows={1}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          aria-label="Mensaje"
        />
        <button
          className="amor-chat-send-btn"
          onClick={handleSend}
          disabled={!text.trim() || sending}
          aria-label="Enviar"
        >
          <i className="fa-solid fa-paper-plane" />
        </button>
      </footer>
    </div>
  );
}
