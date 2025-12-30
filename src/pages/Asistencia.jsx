// ...existing code...
import React, { useState } from "react";
import Select from 'react-select';

const allergenOptions = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'lactosa', label: 'Lactosa' },
  { value: 'frutos secos', label: 'Frutos secos' },
  { value: 'marisco', label: 'Marisco' },
  { value: 'huevo', label: 'Huevo' },
  { value: 'soja', label: 'Soja' },
  { value: 'ninguno', label: 'Ninguno' },
];


const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxyLWXbdjDKO-Bf5FGUSf5kAI1fOrzsORe5-PBfG_FvzUs-RlnUfF2lGS-iXnFos1t4/exec';

async function sendToSheets(data) {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error('Error logging to sheets:', err);
  }
}

const Asistencia = () => {
  const [form, setForm] = useState({
    nombre: '',
    asistentes: '',
    restricciones: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    await sendToSheets({
      'nombre': form.nombre,
      'asistentes': form.asistentes,
      'restricciones': form.restricciones,
      'mensaje': form.mensaje
    });
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="asistencia-textos" style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(120deg, #eaf3fa 60%, #d2e3f3 100%)',
          borderRadius: '2rem',
          boxShadow: '0 4px 32px #b3cbe622',
        }}>
          <h2 style={{color:'#4d7ca6'}}>¡Gracias por confirmar tu asistencia!</h2>
          <p style={{color:'#7fa7cc'}}>Hemos recibido tu respuesta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asistencia-textos" style={{
      maxWidth: 480,
      margin: '0 auto',
      background: 'linear-gradient(120deg, #fff8e7 60%, #f8f6f3 100%)',
      borderRadius: '2rem',
      boxShadow: '0 4px 32px #c9a96e22',
      padding: '2.5rem 1.5rem',
      color: '#3a2e2a',
      fontFamily: 'Lato, sans-serif',
    }}>
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        color: '#c9a96e',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '1.2rem',
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}>Confirma tu asistencia</h2>
      <p style={{
        fontSize: '1.08rem',
        color: '#7c6a4d',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        ¡Atención, atención! Este apartado es, probablemente, el más importante. Queremos verte ahí, queremos compartir todo esto contigo y queremos que, para ti, también sea un día que no olvides. Pero todo eso empieza porque nos confirmes tu asistencia y otros detalles mediante el formulario.
      </p>
      <form className="asistencia-form" style={{
        background: '#fff8e7',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 16px #c9a96e11',
        padding: '2rem 1.2rem',
        color: '#3a2e2a',
        fontFamily: 'inherit',
      }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Nombre y apellidos</label>
          <input
            type="text"
            className="form-control rounded-3 border-0"
            placeholder="Nombre y apellidos"
            required
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Número de asistentes</label>
          <input
            type="number"
            className="form-control rounded-3 border-0"
            min="1"
            max="20"
            placeholder="Total asistentes"
            required
            name="asistentes"
            value={form.asistentes}
            onChange={handleChange}
            style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Restricciones alimenticias</label>
          <input
            type="text"
            className="form-control rounded-3 border-0"
            placeholder="Indica aquí cualquier restricción alimenticia, alergia, intolerancia, etc."
            name="restricciones"
            value={form.restricciones}
            onChange={handleChange}
            style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}}
          />
          <div className="form-text" style={{color:'#bfa16a', fontSize:'0.98rem'}}>Puedes escribir lo que necesites.</div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Mensaje para los novios</label>
          <textarea
            className="form-control rounded-3 border-0"
            rows={3}
            placeholder="Comentarios, deseos, canciones, etc..."
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}}
          />
        </div>
        <button type="submit" className="btn w-100 mt-2 rounded-3" style={{background:'#c9a96e', border:'none', color:'#fff', fontWeight:600, fontSize:'1.1rem', letterSpacing:'0.01em', boxShadow:'0 2px 8px #c9a96e22'}} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar confirmación'}
        </button>
        {enviando && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,248,231,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              background: '#fff8e7',
              borderRadius: '1.5rem',
              boxShadow: '0 2px 16px #c9a96e33',
              padding: '2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div className="spinner-border" style={{color:'#c9a96e', width:'2.5rem', height:'2.5rem'}} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <span style={{color:'#bfa16a', fontWeight:600, fontSize:'1.1rem'}}>Enviando tu confirmación...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export { Asistencia };
