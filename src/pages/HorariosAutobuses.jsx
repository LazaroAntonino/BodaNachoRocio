import React from "react";
import './Home.css';


const HorariosAutobuses = () => (
  <div className="horariosautobuses-textos" style={{
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
      marginBottom: '3rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
    }}>HORARIOS DE AUTOBUSES</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#4682B4',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      Vuestra comodidad es nuestra prioridad, así que hemos contratado autobuses que os llevarán de un punto a otro, sin que tengáis que preocuparos del coche.
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
      maxWidth:600,
      display:'flex',
      flexDirection:'column',
      gap:'3rem'
    }}>
      <li style={{textAlign:'center'}}>
        <span style={{display:'block', textAlign:'center', marginBottom:'1rem'}}>
          <b style={{color:'#4682B4'}}>Denia - Jávea</b>
        </span>
        El autobús saldrá a las <b>11:30</b> desde el hotel <b>La Posada del Mar</b>.
      </li>
      <li style={{textAlign:'center'}}>
        <span style={{display:'block', textAlign:'center', marginBottom:'1rem'}}>
          <b style={{color:'#4682B4'}}>Iglesia de Jávea - Casa Santonja</b>
        </span>
        Al salir de la iglesia, los autobuses os estarán esperando en la parada de la <b>Ronda Norte</b>, junto a la oficina de Correos.
      </li>
      <li style={{textAlign:'center'}}>
        <span style={{display:'block', textAlign:'center', marginBottom:'1rem'}}>
          <b style={{color:'#4682B4'}}>Casa Santonja - Denia - Jávea</b>
        </span>
        La fiesta acabará a la <b>1:00h</b>, pero para aquellos que necesiten volver antes o que quieran renunciar a las horas de fiesta más apasionantes de sus vidas, habrá un primer turno de autobuses.<br />La primera parada será en el hotel <b>La Posada del Mar (Denia)</b> y la segunda en la <b>Playa del Arenal (Jávea)</b>.
      </li>
    </ul>
    {/*
      - El diseño sigue la paleta blanco, Azul Capri y Azul Acero.
      - Estructura y estilos igual que Asistencia, Alojamientos y MasInfo.
      - Responsive y visualmente consistente.
    */}
  </div>
);

export default HorariosAutobuses;
