import React, { useState } from "react";
import fotoTeteMasInfo from '../img/fototetemasinfo.jpeg';
import './Home.css';

const STORED_SHA256_HEX = "b5cd81ff8c5709145696be8ba622519aeea01b447625e67e402c62b633b7064f"; // Genera el hash de tu contraseña real
const IBAN = "ES00 00 000000000 0000000000000000 000"; // Tu IBAN real

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}


const MasInfo = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // El IBAN enmascarado (solo muestra las dos primeras letras, el resto números asteriscos)
  const maskedIban = IBAN.replace(/(?!^ES)[0-9]/g, '*');

  // Cierra y limpia el modal
  const closeModal = () => {
    setShowModal(false);
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  // Handler para el submit del modal
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const hash = await sha256Hex(password.trim());
    if (hash === STORED_SHA256_HEX) {
      setAuthorized(true);
      closeModal();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="masinfo-wrapper" style={{
      maxWidth: 800,
      margin: '0 auto',
      background: 'transparent',
      borderRadius: '2rem',
      boxShadow: 'none',
      padding: '2.5rem 1.5rem',
      color: '#1B5583',
      fontFamily: 'Lato, sans-serif',
    }}>
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        color: '#1B5583',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '1.2rem',
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}>MÁS INFORMACIÓN</h2>

      <p style={{ fontSize: '1.08rem', color: '#4682B4', marginBottom: '1.2rem', marginTop: '2rem', textAlign: 'center' }}>
        Por último, lo que de verdad queremos es que estéis con nosotros ese día, pero si queréis tener un detalle con nosotros, podéis ayudarnos a hacer incluso mejor nuestro viaje de novios. ¡Muchas gracias!
      </p>
      <div style={{ background: 'transparent', borderRadius: '1.2rem', boxShadow: 'none', padding: '1.2rem 1.5rem', color: '#1B5583', fontSize: authorized ? '1.13rem' : '0.98rem', margin: '0 auto 1.5rem auto', maxWidth: 380, textAlign: 'center', fontWeight: authorized ? 600 : 500, letterSpacing: authorized ? '0.04em' : '0.02em' }}>
        {!authorized ? (
          <>
            <div style={{ fontSize: '1.13rem', letterSpacing: '0.04em', marginBottom: '0.7rem', fontWeight: 600 }}>{maskedIban}</div>
            <button
              className="btn rounded-3"
              style={{ background: '#1B5583', color: 'white', border: 'none', fontWeight: 600, fontSize: '1.01rem', padding: '0.45rem 0.9rem' }}
              onClick={() => setShowModal(true)}
            >
              Ver cuenta
            </button>
          </>
        ) : (
          <div style={{ fontSize: '1.13rem', letterSpacing: '0.04em', fontWeight: 600 }}>{IBAN}</div>
        )}
      </div>

      {/* Modal para contraseña */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30, 60, 100, 0.18)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 24px #4682B433',
            padding: '2.1rem 1.7rem 1.5rem 1.7rem',
            minWidth: 300,
            maxWidth: '90vw',
            position: 'relative',
            textAlign: 'center',
          }}>
            <button
              onClick={closeModal}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: 12,
                right: 14,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#4682B4',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}>
              ×
            </button>
            <h4 style={{ color: '#1B5583', fontWeight: 700, marginBottom: '1.1rem', fontSize: '1.18rem', letterSpacing: '0.01em' }}>Introduce la contraseña</h4>
            <form onSubmit={handleModalSubmit}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 220, margin: '0 auto 0.7rem auto' }}>
                <input
                  id="pw-modal"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-control rounded-3"
                  placeholder="Contraseña"
                  style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem', width: '100%', textAlign: 'center', paddingRight: '2.2rem' }}
                  autoComplete="off"
                  autoFocus
                />
                <button type="button" onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '0.5rem',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    color: '#4682B4',
                    outline: 'none',
                    height: '1.8rem',
                    width: '1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.7 2.93-4.98 5.38-6.44m3.13-1.13A9.93 9.93 0 0 1 12 4c5 0 9.27 3.11 11 8a11.05 11.05 0 0 1-2.06 3.34M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .42-.09.82-.24 1.18"/><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m1 1 22 22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12C2.73 7.11 7 4 12 4s9.27 3.11 11 8c-1.73 4.89-6 8-11 8S2.73 16.89 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
              <button type="submit"
                className="btn rounded-3"
                style={{ background: '#1B5583', color: 'white', border: 'none', fontWeight: 600, fontSize: '1.01rem', padding: '0.45rem 0.9rem', marginTop: '0.2rem', width: '100%' }}>
                Acceder
              </button>
              {error && <div style={{ color: '#B00020', textAlign: 'center', marginTop: '0.7rem', fontSize: '0.98rem' }}>{error}</div>}
            </form>
          </div>
        </div>
      )}

      <p style={{
        fontSize: '1.08rem',
        color: '#4682B4',
        marginBottom: '2rem',
        marginTop: '2rem',
        textAlign: 'center',
      }}>
        ¿No estás segura de tu vestido? ¿Alguna aclaración? Si tienes cualquier pregunta para nosotros o nos quieres comentar algo, envíanos un WhatsApp o llámanos por teléfono cuando quieras:
      </p>
      <div style={{
        background: 'transparent',
        borderRadius: '1.2rem',
        boxShadow: 'none',
        padding: '1.2rem 1.5rem',
        color: '#1B5583',
        fontSize: '1.08rem',
        margin: '0 auto 2rem auto',
        maxWidth: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
        alignItems: 'center'
      }}>
        <div><b>Nacho</b> - <a href="tel:696730832" style={{ color: '#1B5583', textDecoration: 'underline' }}>696 730 832</a></div>
        <div><b>Rocío</b> - <a href="tel:608162299" style={{ color: '#1B5583', textDecoration: 'underline' }}>608 162 299</a></div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
        <img
          src={fotoTeteMasInfo}
          alt="Foto Tete Más Información"
          style={{
            maxWidth: '340px',
            width: '100%',
            borderRadius: '18px',
            boxShadow: '0 2px 16px #4682B422',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
export default MasInfo;
