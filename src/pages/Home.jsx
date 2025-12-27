import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { Inspiracion } from "./Inspiracion";
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

export const Home = () => {
	const [active, setActive] = useState("bienvenidos");
	const [selectedAllergens, setSelectedAllergens] = React.useState([]);

	const textos = {
		bienvenidos: (
			<div className="bienvenidos-textos">
				<h1 className="main-title">Rocío & Nacho</h1>
				<h2 className="subtitle">¡Nos casamos!</h2>
				<div className="fecha-lugar">13 Junio 2026<br/>Jávea, Alicante</div>
				<div className="mensaje-principal mt-4">
					<p>A nuestros familiares y amigos…</p>
					<p>Aunque parezca que fue ayer cuando, con una cena improvisada, unos ceviches y cero expectativas, nuestro querido amigo Nacho —y su incapacidad de renunciar a cualquier plan— nos presentara, lo cierto es que han pasado ya 6 años y hoy estamos felices de recordaros que ¡nos casamos!</p>
					<p>En Jávea, el 13 de junio de 2026. Lo repetiremos varias veces, para los más despistados.</p>
					<p>Sabemos que casarnos en Alicante o Madrid habría sido más sencillo, pero confiamos en que nuestra boda sea la excusa perfecta para una escapada de fin de semana que dé por inaugurada nuestra época favorita: ¡el verano! Y nos parecía que no había lugar mejor para hacerlo, que a orillas de nuestro Mediterráneo. Así que, señoras y señores, metan en sus maletas sus mejores galas, pero dejen espacio para la toalla y el bañador.</p>
					<p>Ahora en serio, estamos muy emocionados por compartir este día con todos vosotros – nuestra familia y amigos más queridos – y queremos daros las gracias, de corazón, a todos los que os desplazáis hasta aquí para acompañarnos —algunos incluso desde el otro lado del océano. Nos hace muchísima ilusión celebrar este día rodeados de tanto cariño.</p>
					<p>Será un día para celebrar, reírnos mucho y compartir con nuestras personas favoritas este paso tan importante. Mientras tanto, en esta web os iremos contando todo lo que necesitáis saber: dónde, cómo y cuándo, además de daros información sobre horarios, recomendaciones etc. También es la mejor opción para confirmar vuestra asistencia, si queréis utilizar el servicio de autobús o informarnos sobre cualquier intolerancia o alergia que debamos tener en cuenta.</p>
					<p className="mt-4">Con todo nuestro cariño,<br/>Nacho y Ro</p>
				</div>
			</div>
		),
		asistencia: (
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
		),
		horarios: (
			<div className="horarios-textos">
				<h2>Horarios y Autobuses</h2>
				<p>Vuestra comodidad es nuestra prioridad, así que hemos contratado autobuses que os llevarán cómodamente de un punto a otro, sin que tengáis que preocuparos del coche.</p>
				<ul>
					<li><b>Denia - Jávea:</b> El autobús saldrá a las 11:30 desde el hotel La Posada del Mar.</li>
					<li><b>Jávea - Casa Santonja:</b> Al salir de la iglesia, los autobuses os estarán esperando en ...</li>
					<li><b>Casa Santonja - Denia - Jávea:</b> El primer turno de autobús de vuelta saldrá a las 23:00 h. pero, aquellos que queráis acompañarnos hasta el final, tendréis el vuestro esperándoos a las 00:30h. La primera parada será en el hotel La Posada del Mar (Denia) y la segunda en la Playa del Arenal (Jávea)</li>
				</ul>
			</div>
		),
		alojamientos: (
			<div className="alojamientos-textos">
				<h2>Alojamientos</h2>
				<p>Nos tomamos la libertad de sugeriros algunas opciones de alojamiento en Denia y en Jávea. Si os quedáis en Denia, los autobuses os recogerán para ir a la iglesia, y os traerán de vuelta al final de la celebración.</p>
				<ul>
					<li>Hoteles en Denia</li>
					<li>Hoteles en Jávea</li>
					<li>Hoteles cerca de la finca</li>
				</ul>
			</div>
		),
	};

	// Mapear cada sección a su componente
	const renderSection = () => {
		switch (active) {
			case "bienvenidos":
				return (
					<>
						{textos.bienvenidos}
						<Inspiracion />
					</>
				);
			case "asistencia":
				return textos.asistencia;
			case "horarios":
				return textos.horarios;
			case "alojamientos":
				return textos.alojamientos;
			case "contacto":
				return <div className="section-placeholder">Contáctanos (próximamente)</div>;
			default:
				return null;
		}
	};

	return (
		<div className="home-container d-flex flex-column min-vh-100">
			<nav className="navbar pastel-navbar navbar-expand-lg">
				<div className="container-fluid">
					<span className="navbar-logo me-4">
						<span className="logo-n">R</span>
						<span className="logo-plus">+</span>
						<span className="logo-r">N</span>
					</span>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="mainNavbar">
						<ul className="navbar-links navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<button className={`nav-link pastel-link ${active === "bienvenidos" ? "active" : ""}`} onClick={() => setActive("bienvenidos")}>Bienvenidos</button>
							</li>
							<li className="nav-item">
								<button className={`nav-link pastel-link ${active === "asistencia" ? "active" : ""}`} onClick={() => setActive("asistencia")}>Confirma tu asistencia</button>
							</li>
							<li className="nav-item">
								<button className={`nav-link pastel-link ${active === "horarios" ? "active" : ""}`} onClick={() => setActive("horarios")}>Horarios y autobuses</button>
							</li>
							<li className="nav-item">
								<button className={`nav-link pastel-link ${active === "alojamientos" ? "active" : ""}`} onClick={() => setActive("alojamientos")}>Alojamientos</button>
							</li>
							<li className="nav-item">
								<button className={`nav-link pastel-link ${active === "contacto" ? "active" : ""}`} onClick={() => setActive("contacto")}>Contáctanos</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="home-content container-fluid px-2 px-md-4 py-3 flex-grow-1">
				{renderSection()}
			</main>
		</div>
	);
};
