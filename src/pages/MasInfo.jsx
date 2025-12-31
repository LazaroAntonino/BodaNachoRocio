import React from "react";
import './Home.css';

const MasInfo = () => (
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
    <p style={{
      fontSize: '1.08rem',
      color: '#4682B4',
      marginBottom: '1.2rem',
      marginTop:'2rem',
      textAlign: 'center',
    }}>
      Por último, lo que de verdad queremos es que estéis con nosotros ese día, pero si queréis tener un detalle con nosotros, podéis ayudarnos a hacer incluso mejor nuestro viaje de novios. ¡Muchas gracias!
    </p>
    <div style={{
      background: 'transparent',
      borderRadius: '1.2rem',
      boxShadow: 'none',
      padding: '1.2rem 1.5rem',
      color: '#1B5583',
      fontSize: '1.13rem',
      margin: '0 auto',
      maxWidth: 380,
      textAlign: 'center',
      fontWeight: 600,
      letterSpacing: '0.04em'
    }}>
      ES00 00 000000000 0000000000000000 000
    </div>
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
  </div>
);

export default MasInfo;
