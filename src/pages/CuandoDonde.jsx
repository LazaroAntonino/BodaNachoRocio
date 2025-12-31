import React from "react";
import './Home.css';
// Sustituye las rutas de las imágenes por las correctas en tu proyecto
import acuarelaSanBartolome from '../img/iglesiaSanBartolomeXaviaAcuarela.png';
import acuarelaCasaSantonja from '../img/acuarelaCasasSantoja.png';


const CuandoDonde = () => (
  <div className="cuandodonde-textos" style={{
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
    }}>CUÁNDO Y DÓNDE</h2>
    <ul style={{
      background:'trnsparent',
      borderRadius:'1.2rem',
      boxShadow:'none',
      padding:'1.2rem 1.5rem',
      color:'#1B5583',
      fontSize:'1rem',
      listStyle:'none',
      margin:'0 auto 2rem auto',
      maxWidth:600,
      display:'flex',
      flexDirection:'column',
      gap:'1.1rem'
    }}>
      <li style={{display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'4rem', marginTop:'2rem'}}>
        <span style={{flex:1}}>
          Como el porqué ya está claro, os contamos que la ceremonia será en la <b>Iglesia de San Bartolomé de Jávea</b> el <b>13 de junio de 2026 a las 12:30</b>.
        </span>
        <img src={acuarelaSanBartolome} alt="Acuarela San Bartolomé Jávea" style={{width: 140, height: 300, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
      </li>
      <li style={{display:'flex', alignItems:'center', gap:'1.2rem'}}>
        <img src={acuarelaCasaSantonja} alt="Acuarela Casa Santonja" style={{width: 140, height: 300, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
        <span style={{flex:1}}>
          Continuaremos con la celebración en <b>Casa Santonja (Beniarbeig)</b>.
        </span>
      </li>
    </ul>
    <div style={{
      marginTop: '2.5rem',
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {/* San Bartolomé de Jávea */}
      <div style={{
        flex: '1 1 320px',
        maxWidth: 420,
        minWidth: 260,
        background: 'transparent',
        borderRadius: 18,
        boxShadow: 'none',
        padding: '1.2rem',
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3 style={{color:'#1B5583', fontSize:'1.15rem', marginBottom:'0.7rem', textAlign:'center'}}>San Bartolomé de Jávea</h3>
        <iframe
          title="Mapa San Bartolomé de Jávea"
          src="https://www.google.com/maps?q=Iglesia+San+Bartolom%C3%A9,+Jávea&output=embed"
          width="100%"
          height="220"
          style={{border: 0, borderRadius: 12, boxShadow: '0 2px 12px #4682B422', marginBottom:'0.8rem'}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <a href="https://maps.app.goo.gl/J1uFCweCN4x8sNkm7" target="_blank" rel="noopener noreferrer" style={{
          display:'inline-block',
          background:'#4682B4',
          color:'#fff',
          border:'none',
          borderRadius:'8px',
          padding:'0.5rem 1.2rem',
          fontWeight:600,
          textDecoration:'none',
          fontSize:'1rem',
          boxShadow:'0 2px 8px #4682B422',
          marginTop:'0.2rem',
          cursor:'pointer',
        }}>Cómo llegar</a>
      </div>
      {/* Casa Santonja */}
      <div style={{
        flex: '1 1 320px',
        maxWidth: 420,
        minWidth: 260,
        background: 'transparent',
        borderRadius: 18,
        boxShadow: 'none',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
      }}>
        <h3 style={{color:'#1B5583', fontSize:'1.15rem', marginBottom:'0.7rem', textAlign:'center'}}>Casa Santonja (Beniarbeig)</h3>
        <iframe
          title="Mapa Casa Santonja"
          src="https://www.google.com/maps?q=Casa+Santonja,+Beniarbeig&output=embed"
          width="100%"
          height="220"
          style={{border: 0, borderRadius: 12, boxShadow: '0 2px 12px #4682B422', marginBottom:'0.8rem'}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <a href="https://maps.app.goo.gl/anAuiTQNHw4EvjJE8" target="_blank" rel="noopener noreferrer" style={{
          display:'inline-block',
          background:'#4682B4',
          color:'#fff',
          border:'none',
          borderRadius:'8px',
          padding:'0.5rem 1.2rem',
          fontWeight:600,
          textDecoration:'none',
          fontSize:'1rem',
          boxShadow:'0 2px 8px #4682B422',
          marginTop:'0.2rem',
          cursor:'pointer',
        }}>Cómo llegar</a>
      </div>
    </div>
    {/*
      - Cambia las rutas de las imágenes por las de tus acuarelas escaneadas.
      - Cambia el src del iframe por el mapa real de San Bartolomé y Casa Santonja.
      - El diseño es consistente con el resto de la web y responsive.
    */}
  </div>
);

export default CuandoDonde;
