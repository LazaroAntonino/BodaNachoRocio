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


const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzdM6QQb6GT4G3kqDV71VnL85OOrNwiL8QjjAawY7oxZr-gqSTdW9TIAbG3wAvKLJi3/exec';

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
    acompanante: '',
    acompananteNombre: '',
    autobus: [],
    restricciones: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => {
        if (checked) {
          return { ...prev, autobus: [...prev.autobus, value] };
        } else {
          return { ...prev, autobus: prev.autobus.filter((v) => v !== value) };
        }
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación manual de campos obligatorios
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.acompanante) newErrors.acompanante = 'Selecciona si vendrás con acompañante';
    if (form.acompanante === 'sí' && !form.acompananteNombre.trim()) newErrors.acompananteNombre = 'El nombre del acompañante es obligatorio';
    if (!form.autobus.length) newErrors.autobus = 'Selecciona al menos una opción de autobús';
    if (!form.restricciones.trim()) newErrors.restricciones = 'Este campo es obligatorio';
    setErrores(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setEnviando(true);
    await sendToSheets({
      'nombre': form.nombre,
      'acompanante': form.acompanante,
      'acompananteNombre': form.acompanante === 'sí' ? form.acompananteNombre : '',
      'autobus': form.autobus.join(', '),
      'restricciones': form.restricciones
    });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="asistencia-textos" style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(120deg, #eaf3fa 60%, #d2e3f3 100%)',
          borderRadius: '2rem',
          boxShadow: '0 4px 32px #b3cbe622',
        }}>
          <h2 style={{color:'#1B5583'}}>¡Gracias por confirmar tu asistencia!</h2>
          <p style={{color:'#4682B4'}}>Hemos recibido tu respuesta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asistencia-textos" style={{
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
      }}>CONFIRMA TU ASISTENCIA</h2>
      <form className="asistencia-form" style={{
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 16px #4682B411',
        padding: '2rem 1.2rem',
        color: '#1B5583',
        fontFamily: 'inherit',
      }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={{color:'#1B5583', fontWeight:600}}>Nombre y apellidos</label>
          <input
            type="text"
            className="form-control rounded-3 border-0"
            placeholder="Nombre y apellidos"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{background:'#eaf3fa', color:'#1B5583', border:'1px solid #4682B4', fontSize:'1.05rem'}}
          />
          {errores.nombre && <div style={{color:'#c00', fontSize:'0.98rem', marginTop:4}}>{errores.nombre}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#1B5583', fontWeight:600}}>¿Vendrás con acompañante?</label>
          <div style={{display:'flex', gap:'1.5rem', marginTop:'0.5rem'}}>
            <label style={{display:'flex', alignItems:'center', gap:'0.4em'}}>
              <input type="radio" name="acompanante" value="sí" checked={form.acompanante==='sí'} onChange={handleChange} /> Sí
            </label>
            <label style={{display:'flex', alignItems:'center', gap:'0.4em'}}>
              <input type="radio" name="acompanante" value="no" checked={form.acompanante==='no'} onChange={handleChange} /> No
            </label>
          </div>
          {errores.acompanante && <div style={{color:'#c00', fontSize:'0.98rem', marginTop:4}}>{errores.acompanante}</div>}
        </div>
        {form.acompanante === 'sí' && (
          <div className="mb-3">
            <label className="form-label" style={{color:'#1B5583', fontWeight:600}}>Indica el nombre completo de tu acompañante</label>
            <input
              type="text"
              className="form-control rounded-3 border-0"
              placeholder="Nombre del acompañante"
              name="acompananteNombre"
              value={form.acompananteNombre}
              onChange={handleChange}
              style={{background:'#eaf3fa', color:'#1B5583', border:'1px solid #4682B4', fontSize:'1.05rem'}}
            />
            {errores.acompananteNombre && <div style={{color:'#c00', fontSize:'0.98rem', marginTop:4}}>{errores.acompananteNombre}</div>}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label" style={{color:'#1B5583', fontWeight:600}}>¿Necesitarás servicio de autobús? <span style={{fontWeight:400, fontSize:'0.98em'}}>(puedes marcar una o varias opciones según lo que necesites)</span></label>
          <div style={{display:'flex', flexDirection:'column', gap:'0.5rem', marginTop:'0.5rem'}}>
            <label><input type="checkbox" name="autobus" value="No, voy por mi cuenta" checked={form.autobus.includes('No, voy por mi cuenta')} onChange={handleChange} /> No, voy por mi cuenta</label>
            <label><input type="checkbox" name="autobus" value="Iré desde Denia hasta la Iglesia de San Bartolomé" checked={form.autobus.includes('Iré desde Denia hasta la Iglesia de San Bartolomé')} onChange={handleChange} /> Iré desde Denia hasta la Iglesia de San Bartolomé</label>
            <label><input type="checkbox" name="autobus" value="Iré desde la Iglesia de San Bartolomé hasta Casa Santonja" checked={form.autobus.includes('Iré desde la Iglesia de San Bartolomé hasta Casa Santonja')} onChange={handleChange} /> Iré desde la Iglesia de San Bartolomé hasta Casa Santonja</label>
            <label><input type="checkbox" name="autobus" value="Volveré a Denia en el primer turno" checked={form.autobus.includes('Volveré a Denia en el primer turno')} onChange={handleChange} /> Volveré a Denia en el primer turno</label>
            <label><input type="checkbox" name="autobus" value="Volveré a Denia o Jávea en el segundo turno" checked={form.autobus.includes('Volveré a Denia o Jávea en el segundo turno')} onChange={handleChange} /> Volveré a Denia o Jávea en el segundo turno</label>
          </div>
          {errores.autobus && <div style={{color:'#c00', fontSize:'0.98rem', marginTop:4}}>{errores.autobus}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#1B5583', fontWeight:600}}>¿Alergias, intolerancias o restricciones alimenticias?</label>
          <textarea
            className="form-control rounded-3 border-0"
            rows={2}
            placeholder="Indícanos si tú o tu acompañante tenéis alguna alergia, intolerancia o restricción alimenticia (y a quién corresponde)"
            name="restricciones"
            value={form.restricciones}
            onChange={handleChange}
            style={{background:'#eaf3fa', color:'#1B5583', border:'1px solid #4682B4', fontSize:'1.05rem'}}
          />
          {errores.restricciones && <div style={{color:'#c00', fontSize:'0.98rem', marginTop:4}}>{errores.restricciones}</div>}
        </div>
        <button type="submit" className="btn w-100 mt-2 rounded-3" style={{background:'#1B5583', border:'none', color:'#fff', fontWeight:600, fontSize:'1.1rem', letterSpacing:'0.01em', boxShadow:'0 2px 8px #4682B422'}} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar confirmación'}
        </button>
        {enviando && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(234,243,250,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '1.5rem',
              boxShadow: '0 2px 16px #4682B433',
              padding: '2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div className="spinner-border" style={{color:'#4682B4', width:'2.5rem', height:'2.5rem'}} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <span style={{color:'#1B5583', fontWeight:600, fontSize:'1.1rem'}}>Enviando tu confirmación...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export { Asistencia };
