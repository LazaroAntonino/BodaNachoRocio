import React from "react";


const Ubicacion = () => (
  <div className="ubicacion-textos" style={{
    maxWidth: 520,
    margin: '0 auto',
    background: 'linear-gradient(120deg, #fff8e7 60%, #f8f6f3 100%)',
    borderRadius: '2rem',
    boxShadow: '0 4px 32px #c9a96e22',
    padding: '2.5rem 1.5rem',
    color: '#3a2e2a',
    fontFamily: 'Lato, sans-serif',
  }}>
    <h2 style={{
      fontFamily: 'Playfair Display, serif',
      color: '#c9a96e',
      fontWeight: 700,
      fontSize: '2rem',
      marginBottom: '1.2rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
    }}>Ubicación</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#7c6a4d',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      La celebración será en Jávea, una preciosa ciudad costera en la provincia de Alicante, España.
    </p>
    <div className="ratio ratio-16x9 mb-3" style={{borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 2px 16px #c9a96e22', marginBottom:'1.2rem'}}>
      <iframe
        src="https://www.google.com/maps?q=Jávea,+Alicante,+España&output=embed&z=13"
        width="100%"
        height="350"
        style={{border:0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de Jávea"
      ></iframe>
    </div>
    <a
      href="https://www.google.com/maps/place/Jávea,+Alicante,+España/"
      target="_blank"
      rel="noopener noreferrer"
      className="btn w-100 mt-2"
      style={{
        background: '#c9a96e',
        color: '#fff',
        border: 'none',
        borderRadius: '1rem',
        fontWeight: 600,
        fontSize: '1.1rem',
        boxShadow: '0 2px 8px #c9a96e22',
        letterSpacing: '0.02em',
        transition: 'background 0.2s',
      }}
    >
      Abrir en Maps
    </a>
  </div>
);

export { Ubicacion };