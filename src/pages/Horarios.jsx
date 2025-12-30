import React from "react";


const Horarios = () => (
  <div className="horarios-textos" style={{
    maxWidth: 600,
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
    }}>Horarios y Autobuses</h2>
    <p style={{
      fontSize: '1.08rem',
      color: '#7fa7cc',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      Vuestra comodidad es nuestra prioridad, así que hemos contratado autobuses que os llevarán cómodamente de un punto a otro, sin que tengáis que preocuparos del coche.
    </p>
    <div className="row" style={{display:'flex', gap:'2rem', flexWrap:'wrap', justifyContent:'center'}}>
      <div className="col-md-6 mb-3" style={{background:'#eaf3fa', borderRadius:'1.2rem', boxShadow:'0 2px 12px #b3cbe611', padding:'1.2rem 1rem', minWidth:260, flex:'1 1 260px'}}>
        <h4 className="mb-2 horario-titulo" style={{color:'#4d7ca6', fontWeight:600, fontSize:'1.15rem'}}>Ida</h4>
        <ul style={{paddingLeft:'1.2em', color:'#2a3a4d'}}>
          <li><b>Denia - Jávea:</b> El autobús saldrá a las 11:30 desde el hotel La Posada del Mar.</li>
          <li><b>Jávea - Casa Santonja:</b> Al salir de la iglesia, los autobuses os estarán esperando en la puerta para llevaros a la finca.</li>
        </ul>
      </div>
      <div className="col-md-6 mb-3" style={{background:'#eaf3fa', borderRadius:'1.2rem', boxShadow:'0 2px 12px #b3cbe611', padding:'1.2rem 1rem', minWidth:260, flex:'1 1 260px'}}>
        <h4 className="mb-2 horario-titulo" style={{color:'#4d7ca6', fontWeight:600, fontSize:'1.15rem'}}>Vuelta</h4>
        <ul style={{paddingLeft:'1.2em', color:'#2a3a4d'}}>
          <li><b>Casa Santonja - Denia - Jávea:</b> El primer turno de autobús de vuelta saldrá a las 23:00 h. pero, aquellos que queráis acompañarnos hasta el final, tendréis el vuestro esperándoos a las 00:30h. La primera parada será en el hotel La Posada del Mar (Denia) y la segunda en la Playa del Arenal (Jávea).</li>
        </ul>
      </div>
    </div>
  </div>
);

export { Horarios };
