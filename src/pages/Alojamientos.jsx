import React from "react";


const Alojamientos = () => (
  <div className="alojamientos-textos" style={{
    maxWidth: 480,
    margin: '0 auto',
    background: 'linear-gradient(120deg, #eaf3fa 60%, #d2e3f3 100%)',
    borderRadius: '2rem',
    boxShadow: '0 4px 32px #b3cbe622',
    padding: '2.5rem 1.5rem',
    color: '#2a3a4d',
    fontFamily: 'Lato, sans-serif',
  }}>
    <h2 style={{
      fontFamily: 'Playfair Display, serif',
      color: '#4d7ca6',
      fontWeight: 700,
      fontSize: '2rem',
      marginBottom: '1.2rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
    }}>Alojamientos</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#7fa7cc',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      Nos tomamos la libertad de sugeriros algunas opciones de alojamiento en Denia y en Jávea. Si os quedáis en Denia, los autobuses os recogerán para ir a la iglesia, y os traerán de vuelta al final de la celebración.
    </p>
    <ul style={{
      background:'#eaf3fa',
      borderRadius:'1.2rem',
      boxShadow:'0 2px 12px #b3cbe611',
      padding:'1.2rem 1.5rem',
      color:'#2a3a4d',
      fontSize:'1.08rem',
      listStyle:'disc inside',
      margin:'0 auto',
      maxWidth:340
    }}>
      <li>Hoteles en Denia</li>
      <li>Hoteles en Jávea</li>
      <li>Hoteles cerca de la finca</li>
    </ul>
  </div>
);

export { Alojamientos };
