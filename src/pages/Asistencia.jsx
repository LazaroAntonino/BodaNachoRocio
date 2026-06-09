import React from "react";
import './Home.css';


const Asistencia = () => (
  <div className="asistencia-textos" style={{
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
      marginBottom: '2.5rem',
      letterSpacing: '0.01em',
      textAlign: 'center',
    }}>CONFIRMA TU ASISTENCIA</h2>

    <div style={{
      background: 'rgba(70, 130, 180, 0.07)',
      borderRadius: '1.4rem',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.2rem',
    }}>
      <p style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.35rem',
        fontWeight: 700,
        color: '#1B5583',
        margin: 0,
        letterSpacing: '0.01em',
      }}>
        El plazo de inscripción ha finalizado
      </p>

      <p style={{
        fontSize: '1.05rem',
        color: '#2d5a7a',
        lineHeight: 1.75,
        margin: 0,
        maxWidth: 500,
      }}>
        El período para confirmar la asistencia ya está cerrado. Si crees que hay algún error o necesitas comunicarnos algo, no dudes en ponerte en contacto con los novios directamente.
      </p>

      <div style={{
        marginTop: '0.5rem',
        borderTop: '1px solid rgba(70,130,180,0.2)',
        paddingTop: '1.3rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <p style={{
          fontSize: '1rem',
          color: '#4682B4',
          margin: 0,
          fontStyle: 'italic',
        }}>
          ¡Estamos deseando celebrarlo con vosotros!
        </p>
      </div>
    </div>
  </div>
);

export { Asistencia };
