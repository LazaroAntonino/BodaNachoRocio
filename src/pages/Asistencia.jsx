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


const Asistencia = () => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);
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
      }}>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Nombre y apellidos</label>
          <input type="text" className="form-control rounded-3 border-0" placeholder="Nombre y apellidos" required style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}} />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Número de asistentes</label>
          <input type="number" className="form-control rounded-3 border-0" min="1" max="20" placeholder="Total asistentes" required style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}} />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Alergenos</label>
          <Select
            isMulti
            options={allergenOptions}
            value={selectedAllergens}
            onChange={setSelectedAllergens}
            classNamePrefix="react-select"
            placeholder="Selecciona alérgenos..."
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '0.75rem',
                background: '#f8f6f3',
                color: '#3a2e2a',
                border: '1px solid #f2e6d6',
                minHeight: 44,
                fontSize: '1.05rem',
              }),
              multiValue: (base) => ({
                ...base,
                background: '#c9a96e',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 500,
              }),
              option: (base, state) => ({
                ...base,
                background: state.isSelected ? '#c9a96e' : state.isFocused ? '#f5e6c5' : undefined,
                color: state.isSelected ? '#fff' : '#3a2e2a',
                fontWeight: state.isSelected ? 700 : 400,
              }),
            }}
          />
          <div className="form-text" style={{color:'#bfa16a', fontSize:'0.98rem'}}>Puedes seleccionar varios.</div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:'#bfa16a', fontWeight:600}}>Mensaje para los novios</label>
          <textarea className="form-control rounded-3 border-0" rows={3} placeholder="Comentarios, deseos, canciones, etc..." name="mensaje" style={{background:'#f8f6f3', color:'#3a2e2a', border:'1px solid #f2e6d6', fontSize:'1.05rem'}} />
        </div>
        <button type="submit" className="btn w-100 mt-2 rounded-3" style={{background:'#c9a96e', border:'none', color:'#fff', fontWeight:600, fontSize:'1.1rem', letterSpacing:'0.01em', boxShadow:'0 2px 8px #c9a96e22'}}>Enviar confirmación</button>
      </form>
    </div>
  );
};

export { Asistencia };
