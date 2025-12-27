import React, { useEffect, useState } from "react";
import "./Inspiracion.css";

// Countdown Timer Component
const Countdown = () => {
  // Fecha objetivo: 13 de junio de 2026, 17:00
  const targetDate = new Date(2026, 5, 13, 17, 0, 0).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    complete: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setTimeLeft((prev) => ({ ...prev, complete: true }));
        return;
      }
      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
        complete: false,
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.complete) {
    return (
      <div className="countdown-wrapper">
        <div className="countdown-complete">
          <h3>¡El gran día ha llegado!</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-minimal">
      <div className="countdown-announcement">
        <div className="countdown-title">¡Nos casamos!</div>
      </div>
      <div className="countdown-minimal-header">
        <span className="countdown-minimal-date-inline">13 de junio de 2026</span>
        <div className="countdown-location">Jávea, Alicante</div>
      </div>
      <div className="countdown-minimal-row d-flex flex-row gap-5 align-content-center text-center justify-content-center">
        <div className="countdown-minimal-block">
          <span className="countdown-minimal-number">{timeLeft.days}</span>
          <span className="countdown-minimal-label">días</span>
        </div>
        <div className="countdown-minimal-block">
          <span className="countdown-minimal-number">{timeLeft.hours}</span>
          <span className="countdown-minimal-label">horas</span>
        </div>
        <div className="countdown-minimal-block">
          <span className="countdown-minimal-number">{timeLeft.minutes}</span>
          <span className="countdown-minimal-label">min</span>
        </div>
        <div className="countdown-minimal-block">
          <span className="countdown-minimal-number">{timeLeft.seconds}</span>
          <span className="countdown-minimal-label">seg</span>
        </div>
      </div>
    </div>
  );
};

// ImageSlider Component
const sliderImages = [
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
  "https://picsum.photos/1200/800?random=4",
  "https://picsum.photos/1200/800?random=5",
  "https://picsum.photos/1200/800?random=6",
];

const ImageSlider = ({ autoPlay = true, delay = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = sliderImages.length;
  const wrapperRef = React.useRef(null);
  const startXRef = React.useRef(0);
  const movedRef = React.useRef(false);

  // Autoplay with pause on hover/focus and when user interacts
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(id);
  }, [autoPlay, isPaused, delay, length]);

  // Preload current and next image for smoother transitions
  useEffect(() => {
    const next = (current + 1) % length;
    const imgs = [sliderImages[current], sliderImages[next]];
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [current, length]);

  const goTo = (idx) => {
    setCurrent(idx % length);
  };
  const prev = () => setCurrent((prev) => (prev - 1 + length) % length);
  const next = () => setCurrent((prev) => (prev + 1) % length);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    movedRef.current = false;
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - startXRef.current;
    if (Math.abs(dx) > 20) movedRef.current = true;
  };
  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startXRef.current;
    if (movedRef.current) {
      if (dx > 50) prev();
      else if (dx < -50) next();
    }
    setTimeout(() => setIsPaused(false), 300);
  };

  return (
    <div
      className="gallery-slider"
      ref={wrapperRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
          aria-live="polite"
        >
          {sliderImages.map((src, idx) => (
            <div className="slide-item" key={idx} style={{ minWidth: '100%' }}>
              <img
                src={src}
                alt={`Foto ${idx + 1}`}
                className="slide-img"
                loading={Math.abs(current - idx) <= 1 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="slider-arrow slider-prev"
        aria-label="Anterior"
        onClick={prev}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="slider-arrow slider-next"
        aria-label="Siguiente"
        onClick={next}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="slider-dots" role="tablist" aria-label="Selector de imágenes">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            className={`dot${current === idx ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Ir a foto ${idx + 1}`}
            aria-selected={current === idx}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

// RSVP Form Component
const RSVPForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "",
    guests: "",
    message: "",
  });
  const [showGuests, setShowGuests] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "attendance") {
      setShowGuests(value === "yes");
      if (value !== "yes") setForm((prev) => ({ ...prev, guests: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Aquí puedes integrar lógica de envío real (API, email, etc.)
  };

  if (submitted) {
    return <div className="rsvp-success">¡Gracias por confirmar tu asistencia!</div>;
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <input type="text" name="name" placeholder="Nombre completo" required className="form-input" value={form.name} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <input type="email" name="email" placeholder="Correo electrónico" required className="form-input" value={form.email} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <input type="tel" name="phone" placeholder="Teléfono" className="form-input" value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <select name="attendance" required className="form-select" value={form.attendance} onChange={handleChange}>
            <option value="">¿Asistirás?</option>
            <option value="yes">Sí, asistiré</option>
            <option value="no">No podré asistir</option>
          </select>
        </div>
      </div>
      {showGuests && (
        <div className="form-row">
          <div className="form-field">
            <input type="number" name="guests" placeholder="Número de acompañantes" min="0" max="10" className="form-input" value={form.guests} onChange={handleChange} />
          </div>
        </div>
      )}
      <div className="form-row">
        <div className="form-field">
          <textarea name="message" placeholder="Mensaje especial (opcional)" rows="4" className="form-textarea" value={form.message} onChange={handleChange}></textarea>
        </div>
      </div>
      <button type="submit" className="cta-button cta-primary form-submit">Enviar confirmación</button>
    </form>
  );
};

const Inspiracion = () => {
  return (
    <div className="page-wrapper">
      {/* Imagen principal con texto centrado */}
      <section className="main-photo-section">
        <div className="main-photo-wrapper">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczMLtt4zfc2RiNySEEPgWZk3vzAouyruYBHcVnnk6hgMW2ALnpk1kw5xp9j3rLLybjO5iYbJ4hqXI_SssGee829d1fj2b8A8W_eDcHeTTYS2PjJoHnEG0iE4MBqwJBaBthcF2CV7uL9QDCxJGm7t-sae=w1290-h555-s-no-gm?authuser=0" alt="Rocío y Nacho" className="main-photo-img" />
          <div className="main-photo-overlay">
            <span className="main-photo-text">Rocío y Nacho</span>
          </div>
        </div>
      </section>
      {/* Countdown Section */}
      <section className="countdown-section">
        <div className="section-container mt-3">
          <Countdown />
        </div>
      </section>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h2>A nuestros familiares y amigos…</h2>
          <p>Aunque parezca que fue ayer cuando, con una cena improvisada, unos ceviches y cero expectativas, nuestro querido amigo Nacho —y su incapacidad de renunciar a cualquier plan— nos presentara, lo cierto es que han pasado ya 6 años y hoy estamos felices de recordaros que <b>¡nos casamos!</b></p>
          <h3>En Jávea, el 13 de junio de 2026</h3>
          <p>Lo repetiremos varias veces, para los más despistados.</p>
          <p>Sabemos que casarnos en Alicante o Madrid habría sido más sencillo, pero confiamos en que nuestra boda sea la excusa perfecta para una escapada de fin de semana que dé por inaugurada nuestra época favorita: <b>¡el verano!</b> Y nos parecía que no había lugar mejor para hacerlo, que a orillas de nuestro Mediterráneo. Así que, señoras y señores, metan en sus maletas sus mejores galas, pero dejen espacio para la toalla y el bañador.</p>
          <p>Ahora en serio, estamos muy emocionados por compartir este día con todos vosotros – nuestra familia y amigos más queridos – y queremos daros las gracias, de corazón, a todos los que os desplazáis hasta aquí para acompañarnos —algunos incluso desde el otro lado del océano. Nos hace muchísima ilusión celebrar este día rodeados de tanto cariño.</p>
          <p>Será un día para celebrar, reírnos mucho y compartir con nuestras personas favoritas este paso tan importante. Mientras tanto, en esta web os iremos contando todo lo que necesitáis saber: dónde, cómo y cuándo, además de daros información sobre horarios, recomendaciones etc. También es la mejor opción para confirmar vuestra asistencia, si queréis utilizar el servicio de autobús o informarnos sobre cualquier intolerancia o alergia que debamos tener en cuenta.</p>
          <p className="mt-4">Con todo nuestro cariño,<br/>Nacho y Ro</p>
        </div>
      </section>
    </div>
  );
};

export { Inspiracion };
export default Inspiracion;
