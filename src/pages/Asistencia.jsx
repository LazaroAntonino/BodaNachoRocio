// ...existing code...
import React, { useState, useRef } from "react";
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


const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzvPGxJk5xnTfro6mked0qEChIWSysWM8P7xn9PNX1jIhcc5JCWhNl2BnGxaTakZCc_/exec';

async function sendToSheets(data) {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return true;
  } catch (err) {
    console.error('Error logging to sheets:', err);
    return false;
  }
}


const Asistencia = () => {
  const [form, setForm] = useState({
    nombre: '',
    acompanante: '',
    acompananteNombre: '',
    autobus: [],
    restricciones: '',
    preboda: '', // sí/no
    prebodaNumero: '', // número libre
  });
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});

  // Refs para los campos
  const nombreRef = useRef(null);
  const acompananteRef = useRef(null);
  const acompananteNombreRef = useRef(null);
  const autobusRef = useRef(null);
  const restriccionesRef = useRef(null);
  const prebodaRef = useRef(null);
  const prebodaNumeroRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'autobus') {
      setForm((prev) => {
        let newAutobus = [...prev.autobus];
        if (checked) {
          if (value === 'No, voy por mi cuenta') {
            newAutobus = ['No, voy por mi cuenta'];
          } else {
            newAutobus = newAutobus.filter((v) => v !== 'No, voy por mi cuenta');
            newAutobus.push(value);
          }
        } else {
          newAutobus = newAutobus.filter((v) => v !== value);
        }
        return { ...prev, autobus: newAutobus };
      });
    } else if (name === 'prebodaNumero') {
      // Solo permitir números positivos o vacío
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, prebodaNumero: value }));
      }
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
    if (!form.autobus.length) {
      newErrors.autobus = 'Selecciona al menos una opción de autobús';
    } else if (form.autobus.includes('No, voy por mi cuenta') && form.autobus.length > 1) {
      newErrors.autobus = 'No puedes seleccionar "No, voy por mi cuenta" junto con otras opciones de autobús';
    }
    if (!form.restricciones.trim()) newErrors.restricciones = 'Este campo es obligatorio';
    // Validación de preboda
    if (!form.preboda) newErrors.preboda = 'Por favor, responde si vendrás a la preboda';
    if (form.preboda === 'sí' && (!form.prebodaNumero || parseInt(form.prebodaNumero, 10) < 1)) {
      newErrors.prebodaNumero = 'Indica cuántos asistiréis a la preboda';
    }
    setErrores(newErrors);
    // Scroll automático al primer campo con error
    if (Object.keys(newErrors).length > 0) {
      const order = ['nombre', 'acompanante', 'acompananteNombre', 'autobus', 'restricciones', 'preboda', 'prebodaNumero'];
      for (let key of order) {
        if (newErrors[key]) {
          let ref = null;
          if (key === 'nombre') ref = nombreRef;
          if (key === 'acompanante') ref = acompananteRef;
          if (key === 'acompananteNombre') ref = acompananteNombreRef;
          if (key === 'autobus') ref = autobusRef;
          if (key === 'restricciones') ref = restriccionesRef;
          if (key === 'preboda') ref = prebodaRef;
          if (key === 'prebodaNumero') ref = prebodaNumeroRef;
          if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus && ref.current.focus();
            break;
          }
        }
      }
      return;
    }
    setEnviando(true);
    const ok = await sendToSheets({
      'nombre': form.nombre,
      'acompanante': form.acompanante,
      'acompananteNombre': form.acompanante === 'sí' ? form.acompananteNombre : '',
      'autobus': form.autobus.join(', '),
      'restricciones': form.restricciones,
      'preboda': form.preboda,
      'prebodaNumero': form.preboda === 'sí' ? form.prebodaNumero : '',
    });
    setEnviando(false);
    if (ok) {
      setEnviado(true);
    } else {
      setErrorEnvio(true);
    }
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
          background: 'transparent',
          borderRadius: '2rem',
          boxShadow: 'none',
        }}>
          <h2 style={{ color: '#1B5583' }}>¡Gracias por confirmar tu asistencia!</h2>
          <p style={{ color: '#4682B4' }}>Hemos recibido tu respuesta.</p>
        </div>
      </div>
    );
  }

  if (errorEnvio) {
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
          background: 'transparent',
          borderRadius: '2rem',
          boxShadow: 'none',
        }}>
          <h2 style={{ color: '#c00' }}>No se ha podido guardar tu respuesta</h2>
          <p style={{ color: '#4682B4' }}>Por favor, inténtalo de nuevo más tarde.<br />Si el problema persiste, contacta con los novios.</p>
        </div>
      </div>
    );
  }

  return (
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
        marginBottom: '1.2rem',
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}>CONFIRMA TU ASISTENCIA</h2>
      <form className="asistencia-form" style={{
        background: 'transparent',
        borderRadius: '1.5rem',
        boxShadow: 'none',
        padding: '2rem 1.2rem',
        color: '#1B5583',
        fontFamily: 'inherit',
      }} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>Nombre y apellidos</label>
          <input
            ref={nombreRef}
            type="text"
            className="form-control rounded-3"
            placeholder="Nombre y apellidos"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem' }}
          />
          {errores.nombre && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.nombre}</div>}
        </div>
        <div className="mb-4">
          <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>¿Vendrás con acompañante?</label>
          <div ref={acompananteRef} style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
              <input type="radio" style={{ border: '1px solid #4682B4' }} name="acompanante" value="sí" checked={form.acompanante === 'sí'} onChange={handleChange} /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
              <input type="radio" style={{ border: '1px solid #4682B4' }} name="acompanante" value="no" checked={form.acompanante === 'no'} onChange={handleChange} /> No
            </label>
          </div>
          {errores.acompanante && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.acompanante}</div>}
        </div>
        {form.acompanante === 'sí' && (
          <div className="mb-4">
            <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>Indica el nombre completo de tu acompañante</label>
            <input
              ref={acompananteNombreRef}
              type="text"
              className="form-control rounded-3"
              placeholder="Nombre del acompañante"
              name="acompananteNombre"
              value={form.acompananteNombre}
              onChange={handleChange}
              style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem' }}
            />
            {errores.acompananteNombre && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.acompananteNombre}</div>}
          </div>
        )}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>¿Vendrás/vendréis a la preboda en Denia el viernes 12?</label>
          <div ref={prebodaRef} style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
              <input type="radio" style={{ border: '1px solid #4682B4' }} name="preboda" value="sí" checked={form.preboda === 'sí'} onChange={handleChange} /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
              <input type="radio" style={{ border: '1px solid #4682B4' }} name="preboda" value="no" checked={form.preboda === 'no'} onChange={handleChange} /> No
            </label>
          </div>
          {errores.preboda && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.preboda}</div>}
        </div>
        {form.preboda === 'sí' && (
          <div className="mb-4">
            <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>¿Cuántos vendréis a la preboda?</label>
            <input
              ref={prebodaNumeroRef}
              type="number"
              className="form-control rounded-3"
              placeholder="Número de asistentes a la preboda"
              name="prebodaNumero"
              value={form.prebodaNumero}
              onChange={handleChange}
              style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem', maxWidth: 180 }}
              inputMode="numeric"
            />
            {errores.prebodaNumero && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.prebodaNumero}</div>}
          </div>
        )}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>¿Necesitarás servicio de autobús? <span style={{ fontWeight: 400, fontSize: '0.98em' }}>(puedes marcar una o varias opciones según lo que necesites)</span></label>
          <div ref={autobusRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <label>
              <input
                type="checkbox"
                name="autobus"
                value="No, voy por mi cuenta"
                checked={form.autobus.includes('No, voy por mi cuenta')}
                onChange={handleChange}
                disabled={form.autobus.length > 0 && !form.autobus.includes('No, voy por mi cuenta')}
              /> No, voy por mi cuenta
            </label>
            <label>
              <input
                type="checkbox"
                name="autobus"
                value="Iré desde Denia hasta la Iglesia de San Bartolomé"
                checked={form.autobus.includes('Iré desde Denia hasta la Iglesia de San Bartolomé')}
                onChange={handleChange}
                disabled={form.autobus.includes('No, voy por mi cuenta')}
              /> Iré desde Denia hasta la Iglesia de San Bartolomé
            </label>
            <label>
              <input
                type="checkbox"
                name="autobus"
                value="Iré desde la Iglesia de San Bartolomé hasta Casa Santonja"
                checked={form.autobus.includes('Iré desde la Iglesia de San Bartolomé hasta Casa Santonja')}
                onChange={handleChange}
                disabled={form.autobus.includes('No, voy por mi cuenta')}
              /> Iré desde la Iglesia de San Bartolomé hasta Casa Santonja
            </label>
            <label>
              <input
                type="checkbox"
                name="autobus"
                value="Volveré a Denia en el primer turno"
                checked={form.autobus.includes('Volveré a Denia en el primer turno')}
                onChange={handleChange}
                disabled={form.autobus.includes('No, voy por mi cuenta')}
              /> Volveré a Denia en el primer turno
            </label>
            <label>
              <input
                type="checkbox"
                name="autobus"
                value="Volveré a Denia o Jávea en el segundo turno"
                checked={form.autobus.includes('Volveré a Denia o Jávea en el segundo turno')}
                onChange={handleChange}
                disabled={form.autobus.includes('No, voy por mi cuenta')}
              /> Volveré a Denia o Jávea en el segundo turno
            </label>
          </div>
          {/* Mensaje informativo simple */}
          {form.autobus.includes('No, voy por mi cuenta') && (
            <div style={{
              background: '#fffbe6',
              color: '#bfa100',
              border: '1.5px solid #ffe066',
              borderRadius: 8,
              padding: '0.7em 1em',
              marginTop: 8,
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
            }}>
              <span style={{ fontSize: '1.2em', fontWeight: 900 }}>&#9888;</span>
              Si seleccionas esta opción, no puedes marcar otras opciones de autobús.
            </div>
          )}
          {form.autobus.length > 0 && !form.autobus.includes('No, voy por mi cuenta') && (
            <div style={{
              background: '#fffbe6',
              color: '#bfa100',
              border: '1.5px solid #ffe066',
              borderRadius: 8,
              padding: '0.7em 1em',
              marginTop: 8,
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
            }}>
              <span style={{ fontSize: '1.2em', fontWeight: 900 }}>&#9888;</span>
              Si seleccionas cualquier opción de autobús, no puedes marcar "No, voy por mi cuenta".
            </div>
          )}
          {errores.autobus && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.autobus}</div>}
        </div>
        <div className="mb-4">
          <label className="form-label" style={{ color: '#1B5583', fontWeight: 600 }}>¿Alergias, intolerancias o restricciones alimenticias?</label>
          <textarea
            ref={restriccionesRef}
            className="form-control rounded-3"
            rows={2}
            placeholder="Indícanos si tú o tu acompañante tenéis alguna alergia, intolerancia o restricción alimenticia (y a quién corresponde)"
            name="restricciones"
            value={form.restricciones}
            onChange={handleChange}
            style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem' }}
          />
          {errores.restricciones && <div style={{ color: '#c00', fontSize: '0.98rem', marginTop: 4 }}>{errores.restricciones}</div>}
        </div>
        <button type="submit" className="btn w-100 mt-2 rounded-3" style={{ background: '#1B5583', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.01em', boxShadow: '0 2px 8px #4682B422' }} disabled={enviando}>
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
              <div className="spinner-border" style={{ color: '#4682B4', width: '2.5rem', height: '2.5rem' }} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <span style={{ color: '#1B5583', fontWeight: 600, fontSize: '1.1rem' }}>Enviando tu confirmación...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export { Asistencia };
