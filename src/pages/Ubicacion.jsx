import React from "react";

const Ubicacion = () => (
  <div className="ubicacion-textos">
    <h2>Ubicación</h2>
    <p>La celebración será en Jávea, una preciosa ciudad costera en la provincia de Alicante, España.</p>
    <div className="ratio ratio-16x9 mb-3" style={{borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 2px 16px #0002'}}>
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
        background: '#3a2e2a',
        color: '#fff',
        border: 'none',
        borderRadius: '1rem',
        fontWeight: 500,
        fontSize: '1.1rem',
        boxShadow: '0 2px 8px #0001',
        letterSpacing: '0.02em',
        transition: 'background 0.2s',
      }}
    >
      Abrir en Maps
    </a>
  </div>
);

export { Ubicacion };