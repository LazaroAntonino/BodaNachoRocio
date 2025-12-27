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
    <div className="asistencia-textos">
      <h2>Confirma tu asistencia</h2>
      <p>¡Atención, atención! Este apartado es, probablemente, el más importante. Queremos verte ahí, queremos compartir todo esto contigo y queremos que, para ti, también sea un día que no olvides. Pero todo eso empieza porque nos confirmes tu asistencia y otros detalles mediante el formulario.</p>
      <form className="asistencia-form mt-4 p-4 rounded-4 shadow-lg bg-pastel-dark text-white" style={{maxWidth: 420, margin: '0 auto', background: '#3a2e2a', borderRadius: '1.5rem'}}>
        <div className="mb-3">
          <label className="form-label text-white">Nombre y apellidos</label>
          <input type="text" className="form-control rounded-3 border-0" placeholder="Nombre y apellidos" required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Número de asistentes</label>
          <input type="number" className="form-control rounded-3 border-0" min="1" max="20" placeholder="Total asistentes" required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Alergenos</label>
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
                background: '#fff8e7',
                color: '#333',
                border: 'none',
                minHeight: 44,
              }),
              multiValue: (base) => ({
                ...base,
                background: '#c9a96e',
                color: '#fff',
                borderRadius: 8,
              }),
              option: (base, state) => ({
                ...base,
                background: state.isSelected ? '#c9a96e' : state.isFocused ? '#f5e6c5' : undefined,
                color: state.isSelected ? '#fff' : '#333',
              }),
            }}
          />
          <div className="form-text text-light">Puedes seleccionar varios.</div>
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Mensaje para los novios</label>
          <textarea className="form-control rounded-3 border-0" rows={3} placeholder="Comentarios, deseos, canciones, etc..." name="mensaje" />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2 rounded-3" style={{background:'#c9a96e', border:'none'}}>Enviar confirmación</button>
      </form>
    </div>
  );
};

export { Asistencia };
export { Asistencia };
