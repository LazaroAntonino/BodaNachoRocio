import React from "react";
import './Home.css';
// Sustituye las rutas de las imágenes por las correctas en tu proyecto
import acuarelaSanBartolome from '../img/atardecerBodaTete.jpeg';
import acuarelaCasaSantonja from '../img/atardecerBodaTete.jpeg';

const CuandoDonde = () => (
  <div className="cuandodonde-wrapper" style={{background: '#fff', color: '#1B5583', padding: '2.5rem 0'}}>
    <div className="container" style={{maxWidth: 900, margin: '0 auto'}}>
      {/* Título */}
      <h2 style={{color: '#1B5583', fontWeight: 700, fontSize: '2.2rem', marginBottom: '2rem'}}>CUÁNDO Y DÓNDE</h2>
      {/* Bloque 1: Iglesia */}
      <div className="cuandodonde-bloque" style={{display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: 220}}>
          <p style={{fontSize: '1.18rem', marginBottom: 0}}>
            Como el porqué ya está claro, os contamos que la ceremonia será en la <b>Iglesia de San Bartolomé de Jávea</b> el <b>13 de junio de 2026 a las 12:30</b>.
          </p>
        </div>
        <img src={acuarelaSanBartolome} alt="Acuarela San Bartolomé Jávea" style={{width: 180, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
      </div>
      {/* Bloque 2: Casa Santonja */}
      <div className="cuandodonde-bloque" style={{display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap'}}>
        <img src={acuarelaCasaSantonja} alt="Acuarela Casa Santonja" style={{width: 180, borderRadius: 12, boxShadow: '0 2px 12px #4682B433'}} />
        <div style={{flex: 1, minWidth: 220}}>
          <p style={{fontSize: '1.18rem', marginBottom: 0}}>
            Continuaremos con la celebración en <b>Casa Santonja (Beniarbeig)</b>.
          </p>
        </div>
      </div>
      {/* Mapa */}
      <div className="cuandodonde-mapa" style={{marginTop: '2.5rem', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px #4682B422'}}>
        {/* Puedes cambiar los src de los iframes por los mapas reales */}
        <iframe
          title="Mapa San Bartolomé y Casa Santonja"
          src="https://www.google.com/maps/d/embed?mid=1wQn1QwQwQwQwQwQwQwQwQwQwQwQwQwQ&ehbc=2E312F"
          width="100%"
          height="350"
          style={{border: 0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {/* Comentarios explicativos */}
      {/*
        - Cambia las rutas de las imágenes por las de tus acuarelas escaneadas.
        - Cambia el src del iframe por el mapa real de San Bartolomé y Casa Santonja.
        - El diseño es responsive y usa la paleta blanco, Azul Capri y Azul Acero.
      */}
    </div>
  </div>
);

export default CuandoDonde;
