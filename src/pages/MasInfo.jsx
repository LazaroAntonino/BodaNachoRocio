import React, { useState } from "react";
import fotoTeteMasInfo from '../img/fototetemasinfo.jpeg';
import './Home.css';

const STORED_SHA256_HEX = "b5cd81ff8c5709145696be8ba622519aeea01b447625e67e402c62b633b7064f"; // Genera el hash de tu contraseña real
const IBAN = "ES26 0073 0100 5402 1683 8738"; // Tu IBAN real

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}


const MasInfo = () => {
  const [authorized, setAuthorized] = useState(true);

  // El IBAN enmascarado (solo muestra las dos primeras letras, el resto números asteriscos)
  const maskedIban = IBAN.replace(/(?!^ES)[0-9]/g, '*');

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
          </>
        ) : (
          <div style={{ fontSize: '1.13rem', letterSpacing: '0.04em', fontWeight: 600 }}>{IBAN}</div>
        )}
      </div>

      {/* Modal para contraseña */}
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
