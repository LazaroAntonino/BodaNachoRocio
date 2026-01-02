import React from "react";
import './Home.css';
// Sustituye las rutas de las imágenes por las correctas en tu proyecto
import acuarelaSanBartolome from '../img/fotoiglesiatete.jpeg';
import acuarelaCasaSantonja from '../img/fotofincatete.jpeg';


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
      marginBottom: '3rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
    }}>CUÁNDO Y DÓNDE</h2>
    <div style={{display:'flex', flexDirection:'column', gap:'3rem', margin:'2.2rem auto', maxWidth:600}}>
      {/* Iglesia */}
      <div>
          <div style={{textAlign:'center', color:'#4682B4', fontWeight:'bold', fontSize:'1.15rem', marginBottom:'0.5rem'}}>Iglesia de San Bartolomé de Jávea</div>
          <img 
            src={acuarelaSanBartolome} 
            alt="Acuarela San Bartolomé Jávea" 
            style={{
              width:'100%', 
              height:'500px', 
              objectFit:'cover', 
              borderRadius:'18px', 
              boxShadow:'0 2px 12px #4682B433',
              transition:'height 0.3s',
              alignContent:'center',
            }} 
            className="img-sanbartolome"
          />
        <div style={{textAlign:'center', margin:'1.5rem auto 0 auto', color:'#1B5583', fontSize:'1.08rem', maxWidth:'95%', lineHeight:'1.7'}}>
          Como el porqué ya está claro, os contamos que la ceremonia será en la <b>Iglesia de San Bartolomé de Jávea</b> el <b>13 de junio de 2026 a las 12:30</b>.
        </div>
        <div style={{margin:'1.2rem auto 0 auto', maxWidth:'95%'}}>
          <iframe
            title="Mapa San Bartolomé de Jávea"
            src="https://www.google.com/maps?q=Iglesia+San+Bartolom%C3%A9,+Jávea&output=embed"
            width="100%"
            height="180"
            style={{border: 0, borderRadius: 12, boxShadow: '0 2px 12px #4682B422'}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style={{textAlign:'center', marginTop:'0.7rem'}}>
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
      </div>
      {/* Finca */}
      <div>
          <div style={{textAlign:'center', color:'#4682B4', fontWeight:'bold', fontSize:'1.15rem', marginBottom:'0.5rem', marginTop:'none'}}>Casa Santonja (Beniarbeig)</div>
          <img 
            src={acuarelaCasaSantonja} 
            alt="Acuarela Casa Santonja" 
            style={{
              width:'100%', 
              height:'400px', 
              objectFit:'cover', 
              borderRadius:'18px', 
              boxShadow:'0 2px 12px #4682B433',
              transition:'height 0.3s',
            }} 
            className="img-santonja"
          />
        <div style={{textAlign:'center', margin:'1.5rem auto 0 auto', color:'#1B5583', fontSize:'1.08rem', maxWidth:'95%', lineHeight:'1.7'}}>
          Continuaremos con la celebración en <b>Casa Santonja (Beniarbeig)</b>.
        </div>
        <div style={{margin:'1.2rem auto 0 auto', maxWidth:'95%'}}>
          <iframe
            title="Mapa Casa Santonja"
            src="https://www.google.com/maps?q=Casa+Santonja,+Beniarbeig&output=embed"
            width="100%"
            height="180"
            style={{border: 0, borderRadius: 12, boxShadow: '0 2px 12px #4682B422'}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style={{textAlign:'center', marginTop:'0.7rem'}}>
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
    </div>
    {/*
      - Cambia las rutas de las imágenes por las de tus acuarelas escaneadas.
      - Cambia el src del iframe por el mapa real de San Bartolomé y Casa Santonja.
      - El diseño es consistente con el resto de la web y responsive.
    */}
  </div>
);

export default CuandoDonde;
