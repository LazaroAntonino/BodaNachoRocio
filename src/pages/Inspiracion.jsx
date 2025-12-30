
import React, { useEffect, useState } from "react";
import "./Inspiracion.css";
import fotoPrincipal from '../img/fotomarTete.jpeg';
import fotoSecundaria from '../img/atardecerBodaTete.jpeg';

// Countdown Timer Component
const Countdown = () => {
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
    <div className="countdown-minimal mt-5">
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


const Inspiracion = () => {
  return (
    <div className="page-wrapper" style={{background: 'var(--azul-crema-1)', minHeight: '100vh'}}>
      <section className="main-photo-section">
        <div className="main-photo-wrapper">
          <img src={fotoSecundaria} alt="Rocío y Nacho" className="main-photo-img" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} />
          <div className="main-photo-overlay">
            <span className="main-photo-text">Rocío y Nacho</span>
          </div>
        </div>
      </section>
      <section className="main-photo-section">
        <div className="main-photo-wrapper">
          <img src={fotoPrincipal} alt="Rocío y Nacho" className="main-photo-img" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} />
          <div className="main-photo-overlay">
            <span className="main-photo-text">
              Ha llegado el momento: ¡nos casamos!<br />
              <span style={{fontSize: '1.3rem', display: 'block', marginTop: '0.5em'}}>13 de junio de 2026</span><br />
              <span style={{fontSize: '1.1rem', display: 'block', marginTop: '0.2em'}}>Jávea, Alicante</span>
            </span>
          </div>
        </div>
      </section>
      <section className="countdown-section">
        <div className="section-container mt-5">
          <Countdown />
        </div>
      </section>
      <section className="hero-section" style={{background: 'transparent', boxShadow: 'none'}}>
        <div className="hero-container carta-texto" style={{background: 'var(--azul-crema-1)', boxShadow: 'none', textAlign: 'left', width: '100%', margin: 0, padding: '2.5rem 0 2rem 0', maxWidth: '100vw'}}>
          <div style={{color: 'var(--azul-crema-texto)', fontFamily: "'ProximaNova', Helvetica, Arial, sans-serif", fontSize: '1.13rem', width: '100%', margin: '0 auto', padding: 0}}>
            <p style={{marginBottom: '1.2em', fontWeight: 500, background: 'transparent'}}>A nuestras familias y amigos…</p>
            <p style={{marginBottom: '1.2em', background: 'transparent'}}>Aunque parezca que fue ayer cuando, con una cena improvisada y cero expectativas, nuestro querido amigo Nacho —y su incapacidad de renunciar a cualquier plan— nos presentara, lo cierto es que han pasado ya 7 años y hoy estamos felices de recordaros que <b>¡nos casamos!</b></p>
            <p style={{marginBottom: '1.2em', background: 'transparent'}}>En Jávea, el 13 de junio de 2026. Lo repetiremos varias veces, para los más despistados.</p>
            <p style={{marginBottom: '1.2em', background: 'transparent'}}>Sabemos que casarnos en Alicante o Madrid habría sido lo más sencillo, pero nos gustan los retos y que nuestra boda sea la excusa perfecta para una escapada de fin de semana que dé por inaugurado el verano. Y nos parecía que no había lugar mejor para hacerlo que a orillas de nuestro Mediterráneo. Así que, hagan las maletas con sus mejores galas, pero dejen espacio para la toalla y el bañador.</p>
            <p style={{marginBottom: '1.2em', background: 'transparent'}}>Estamos muy contentos de poder compartir este día con todos vosotros —nuestra familia y amigos más queridos— y queremos daros las gracias de todo corazón a todos los que venís hasta aquí para acompañarnos en este día tan importante. Nos hace muchísima ilusión celebrar este día rodeados de tanto cariño.</p>
            <p style={{marginBottom: '1.2em', background: 'transparent'}}>Mientras tanto, en esta web os iremos contando todo lo que necesitáis saber: dónde, cómo y cuándo, además de daros información sobre horarios, recomendaciones, etc. También es la mejor opción para confirmar vuestra asistencia, si queréis utilizar el servicio de autobús o informarnos sobre cualquier intolerancia o alergia que debamos tener en cuenta.</p>
            <p style={{marginTop: '2em', fontWeight: 500, background: 'transparent'}}>Con todo nuestro cariño,<br/>Rocío y Nacho.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Inspiracion };
export default Inspiracion;
