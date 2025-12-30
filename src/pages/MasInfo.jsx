import React from "react";
import './Home.css';

const MasInfo = () => (
  <div className="masinfo-wrapper" style={{
    maxWidth: 800,
    margin: '0 auto',
    background: 'linear-gradient(120deg, #fff 60%, #eaf3fa 100%)',
    borderRadius: '2rem',
    boxShadow: '0 4px 32px #4682B422',
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
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      ¿No estás segura de tu vestido? ¿Alguna aclaración? Si tienes cualquier pregunta para nosotros o nos quieres comentar algo, envíanos un WhatsApp o llámanos por teléfono cuando quieras:
    </p>
    <div style={{
      background:'#eaf3fa',
      borderRadius:'1.2rem',
      boxShadow:'0 2px 12px #4682B411',
      padding:'1.2rem 1.5rem',
      color:'#1B5583',
      fontSize:'1.08rem',
      margin:'0 auto 2rem auto',
      maxWidth:380,
      display:'flex',
      flexDirection:'column',
      gap:'0.7rem',
      alignItems:'center'
    }}>
      <div><b>Nacho</b> - <a href="tel:696730832" style={{color:'#1B5583', textDecoration:'underline'}}>696 730 832</a></div>
      <div><b>Rocío</b> - <a href="tel:608162299" style={{color:'#1B5583', textDecoration:'underline'}}>608 162 299</a></div>
    </div>
    <p style={{
      fontSize: '1.08rem',
      color: '#4682B4',
      marginBottom: '1.2rem',
      textAlign: 'center',
    }}>
      Por último, lo que de verdad queremos es que estéis con nosotros ese día, pero si queréis tener un detalle con nosotros, podéis ayudarnos a hacer incluso mejor nuestro viaje de novios. ¡Muchas gracias!
    </p>
    <div style={{
      background:'#eaf3fa',
      borderRadius:'1.2rem',
      boxShadow:'0 2px 12px #4682B411',
      padding:'1.2rem 1.5rem',
      color:'#1B5583',
      fontSize:'1.13rem',
      margin:'0 auto',
      maxWidth:380,
      textAlign:'center',
      fontWeight:600,
      letterSpacing:'0.04em'
    }}>
      ES00 00 000000000 0000000000000000 000
    </div>
  </div>
);

export default MasInfo;
