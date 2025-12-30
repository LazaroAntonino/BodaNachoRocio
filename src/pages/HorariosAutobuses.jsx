import React from "react";
import './Home.css';

const HorariosAutobuses = () => (
  <div className="cuandodonde-wrapper horariosautobuses-wrapper">
    <div className="container" style={{maxWidth: 900, margin: '0 auto'}}>
      {/* Título */}
      <h2 style={{color: '#1B5583', fontWeight: 700, fontSize: '2.2rem', marginBottom: '2rem'}}>HORARIOS DE AUTOBUSES</h2>
      <div className="horariosautobuses-bloque" style={{marginBottom: '2.2rem'}}>
        <p style={{fontSize: '1.18rem'}}>
          Vuestra comodidad es nuestra prioridad, así que hemos contratado autobuses que os llevarán de un punto a otro, sin que tengáis que preocuparos del coche.
        </p>
      </div>
      {/* Trayecto 1 */}
      <div className="horariosautobuses-bloque" style={{display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.7rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: 220}}>
          <b style={{color: '#4682B4'}}>Denia - Jávea</b>
          <div>El autobús saldrá a las <b>11:30</b> desde el hotel <b>La Posada del Mar</b>.</div>
        </div>
      </div>
      {/* Trayecto 2 */}
      <div className="horariosautobuses-bloque" style={{display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.7rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: 220}}>
          <b style={{color: '#4682B4'}}>Iglesia de Jávea - Casa Santonja</b>
          <div>Al salir de la iglesia, los autobuses os estarán esperando en la parada de la <b>Ronda Norte</b>, junto a la oficina de Correos.</div>
        </div>
      </div>
      {/* Trayecto 3 */}
      <div className="horariosautobuses-bloque" style={{display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.7rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: 220}}>
          <b style={{color: '#4682B4'}}>Casa Santonja - Denia - Jávea</b>
          <div>La fiesta acabará a la <b>1:00h</b>, pero para aquellos que necesiten volver antes o que quieran renunciar a las horas de fiesta más apasionantes de sus vidas, habrá un primer turno de autobuses.<br />La primera parada será en el hotel <b>La Posada del Mar (Denia)</b> y la segunda en la <b>Playa del Arenal (Jávea)</b>.</div>
        </div>
      </div>
      {/* Comentarios explicativos */}
      {/*
        - El diseño sigue la paleta blanco, Azul Capri y Azul Acero.
        - Estructura y estilos inspirados en CuandoDonde.jsx.
        - Responsive y visualmente consistente.
      */}
    </div>
  </div>
);

export default HorariosAutobuses;
