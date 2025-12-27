import React from "react";


const Alojamientos = () => (
  <div className="alojamientos-textos" style={{
    maxWidth: 480,
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
    }}>Alojamientos</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#7c6a4d',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      Nos tomamos la libertad de sugeriros algunas opciones de alojamiento en Denia y en Jávea. Si os quedáis en Denia, los autobuses os recogerán para ir a la iglesia, y os traerán de vuelta al final de la celebración.
    </p>
    <ul style={{
      background:'#fff8e7',
      borderRadius:'1.2rem',
      boxShadow:'0 2px 12px #c9a96e11',
      padding:'1.2rem 1.5rem',
      color:'#3a2e2a',
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
