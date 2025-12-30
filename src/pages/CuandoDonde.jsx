import React from "react";
import './Home.css';
// Sustituye las rutas de las imágenes por las correctas en tu proyecto
import acuarelaSanBartolome from '../img/atardecerBodaTete.jpeg';
import acuarelaCasaSantonja from '../img/atardecerBodaTete.jpeg';


const CuandoDonde = () => (
  <div className="cuandodonde-textos" style={{
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
    }}>CUÁNDO Y DÓNDE</h2>
    <ul style={{
      background:'#eaf3fa',
      borderRadius:'1.2rem',
      boxShadow:'0 2px 12px #4682B411',
      padding:'1.2rem 1.5rem',
      color:'#1B5583',
      fontSize:'1.08rem',
      listStyle:'none',
      margin:'0 auto 2rem auto',
      maxWidth:600,
      display:'flex',
      flexDirection:'column',
      gap:'1.1rem'
    }}>
      <li style={{display:'flex', alignItems:'center', gap:'1.2rem'}}>
        <span style={{flex:1}}>
          Como el porqué ya está claro, os contamos que la ceremonia será en la <b>Iglesia de San Bartolomé de Jávea</b> el <b>13 de junio de 2026 a las 12:30</b>.
        </span>
        <img src={acuarelaSanBartolome} alt="Acuarela San Bartolomé Jávea" style={{width: 90, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
      </li>
      <li style={{display:'flex', alignItems:'center', gap:'1.2rem'}}>
        <img src={acuarelaCasaSantonja} alt="Acuarela Casa Santonja" style={{width: 90, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
        <span style={{flex:1}}>
          Continuaremos con la celebración en <b>Casa Santonja (Beniarbeig)</b>.
        </span>
      </li>
    </ul>
    <div style={{
      marginTop: '2.5rem',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 2px 16px #4682B422',
      maxWidth: 420,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <iframe
        title="Mapa San Bartolomé y Casa Santonja"
        src="https://www.google.com/maps/d/embed?mid=1wQn1QwQwQwQwQwQwQwQwQwQwQwQwQwQ&ehbc=2E312F"
        width="100%"
        height="300"
        style={{border: 0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    {/*
      - Cambia las rutas de las imágenes por las de tus acuarelas escaneadas.
      - Cambia el src del iframe por el mapa real de San Bartolomé y Casa Santonja.
      - El diseño es consistente con el resto de la web y responsive.
    */}
  </div>
);

export default CuandoDonde;
