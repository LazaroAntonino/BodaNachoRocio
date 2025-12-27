import React from "react";

const Horarios = () => (
  <div className="horarios-textos">
    <h2>Horarios y Autobuses</h2>
    <p>Vuestra comodidad es nuestra prioridad, así que hemos contratado autobuses que os llevarán cómodamente de un punto a otro, sin que tengáis que preocuparos del coche.</p>
    <div className="row">
      <div className="col-md-6 mb-3">
        <h4 className="mb-2 horario-titulo">Ida</h4>
        <ul>
          <li><b>Denia - Jávea:</b> El autobús saldrá a las 11:30 desde el hotel La Posada del Mar.</li>
          <li><b>Jávea - Casa Santonja:</b> Al salir de la iglesia, los autobuses os estarán esperando en la puerta para llevaros a la finca.</li>
        </ul>
      </div>
      <div className="col-md-6 mb-3">
        <h4 className="mb-2 horario-titulo">Vuelta</h4>
        <ul>
          <li><b>Casa Santonja - Denia - Jávea:</b> El primer turno de autobús de vuelta saldrá a las 23:00 h. pero, aquellos que queráis acompañarnos hasta el final, tendréis el vuestro esperándoos a las 00:30h. La primera parada será en el hotel La Posada del Mar (Denia) y la segunda en la Playa del Arenal (Jávea).</li>
        </ul>
      </div>
    </div>
  </div>
);

export { Horarios };
