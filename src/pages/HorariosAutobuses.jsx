import React from "react";
import './Home.css';

const sectionCardStyle = {
  background: 'rgba(70, 130, 180, 0.07)',
  borderRadius: '1.2rem',
  padding: '1.5rem 1.7rem',
  marginBottom: '1.8rem',
};

const sectionTitleStyle = {
  fontFamily: 'Playfair Display, serif',
  color: '#1B5583',
  fontWeight: 700,
  fontSize: '1.15rem',
  marginBottom: '1rem',
  letterSpacing: '0.05em',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const bodyTextStyle = {
  fontSize: '1.05rem',
  color: '#2d5a7a',
  lineHeight: 1.75,
  marginBottom: '0.85rem',
};

const returnCardStyle = {
  background: 'rgba(27, 85, 131, 0.07)',
  borderRadius: '0.9rem',
  padding: '1rem 1.3rem',
  borderLeft: '4px solid #4682B4',
};

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

    {/* Título */}
    <h2 style={{
      fontFamily: 'Playfair Display, serif',
      color: '#1B5583',
      fontWeight: 700,
      fontSize: '2rem',
      marginBottom: '0.4rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
      paddingBottom: '5rem',
    }}>AUTOBUSES</h2>

    {/* IDA */}
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>
         IDA
      </div>
      <p style={bodyTextStyle}>
        Para los que os alojáis en el <b>Port Denia</b>, el autobús saldrá a las <b>10:45</b> de la parada del hotel, por lo que conviene que estéis unos minutos antes allí.
      </p>
      <p style={bodyTextStyle}>
        Para todos los demás, el autobús saldrá puntual a las <b>11:00</b> de la zona de parking de autobuses que está delante del hotel{' '}
        <b>La Posada del Mar</b> (por lo que también conviene llegar con antelación). Ésta es la dirección exacta:{' '}
        <span style={{ fontStyle: 'italic', color: '#1B5583' }}>APARCAMIENTO, CV-730, 1, 03700 Dénia, Alicante</span>
        {' — '}
        <a
          href="https://maps.app.goo.gl/kZrjsiGBc4VD823z9?g_st=aw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4682B4', fontWeight: 600, textDecoration: 'underline' }}
        >
          Ver en Google Maps
        </a>
      </p>
      <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
        A los que estáis en <b>Jávea</b>, tened en cuenta que <b>no saldrá ningún autobús del Arenal</b> a la iglesia.
      </p>
    </div>

    {/* TRAYECTO IGLESIA → FINCA */}
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>
         TRAYECTO IGLESIA → FINCA
      </div>
      <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
        Tendréis que coger los autobuses en el mismo sitio en el que os dejaron para ir a la iglesia, en la{' '}
        <b>Calle Ronda Norte</b>.
      </p>
    </div>

    {/* VUELTA */}
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>
         VUELTA
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        {/* 1er autobús */}
        <div style={returnCardStyle}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            color: '#1B5583',
            fontSize: '1.05rem',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em',
          }}>
            🕙 Primer autobús — 22:30
          </div>
          <div style={{ fontSize: '1.03rem', color: '#2d5a7a', lineHeight: 1.7 }}>
            <b>Casa Santonja → Denia:</b> Un autobús volverá a Denia a las <b>22:30</b>, con parada delante del hotel{' '}
            <b>La Posada del Mar</b>.
          </div>
        </div>

        {/* 2° autobús */}
        <div style={returnCardStyle}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            color: '#1B5583',
            fontSize: '1.05rem',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em',
          }}>
            🕧 Segundo autobús — 0:40
          </div>
          <div style={{ fontSize: '1.03rem', color: '#2d5a7a', lineHeight: 1.7 }}>
            <b>Casa Santonja → Denia → Jávea:</b> El siguiente volverá a Denia sobre las <b>0:40</b>, con parada
            delante del hotel <b>La Posada del Mar</b> y en el <b>Arenal de Jávea</b>.
          </div>
        </div>

      </div>
    </div>

  </div>
);

export default HorariosAutobuses;
