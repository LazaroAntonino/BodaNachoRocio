import React from "react";



const Alojamientos = () => (
  <div className="alojamientos-textos" style={{
    maxWidth: '800px',
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
    }}>ALOJAMIENTOS</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#4682B4',
      marginBottom: '2rem',
      marginTop:'2rem',
      textAlign: 'center',
    }}>
      En este documento os dejamos algunas ideas de hoteles en Denia, en Jávea y próximos a Casa Santonja:
    </p>
    <ul style={{
      background:'transparent',
      borderRadius:'1.2rem',
      boxShadow:'none',
      padding:'1.2rem 1.5rem',
      color:'#1B5583',
      fontSize:'1.08rem',
      listStyle:'none',
      margin:'0 auto',
      maxWidth:380,
      display:'flex',
      flexDirection:'column',
      gap:'1.1rem'
    }}>
      <li style={{textAlign:'center'}}>
        <a href="https://drive.google.com/your-link-denia" target="_blank" rel="noopener noreferrer" style={{color:'#1B5583', fontWeight:600, textDecoration:'underline'}}>Hoteles en Denia</a>
      </li>
      <li style={{textAlign:'center'}}>
        <a href="https://drive.google.com/your-link-javea" target="_blank" rel="noopener noreferrer" style={{color:'#1B5583', fontWeight:600, textDecoration:'underline'}}>Hoteles en Jávea</a>
      </li>
      <li style={{textAlign:'center'}}>
        <a href="https://drive.google.com/your-link-finca" target="_blank" rel="noopener noreferrer" style={{color:'#1B5583', fontWeight:600, textDecoration:'underline'}}>Hoteles cerca de la finca</a>
      </li>
    </ul>
    {/*
      - Sustituye los enlaces por los enlaces reales de tus documentos en Drive.
      - El diseño es consistente con la web y responsive.
    */}
  </div>
);

export { Alojamientos };
