import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { Inspiracion } from "./Inspiracion";
import { Asistencia } from "./Asistencia";
import { Horarios } from "./Horarios";
import { Alojamientos } from "./Alojamientos";
import { Ubicacion } from "./Ubicacion";
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


	// Mapear cada sección a su componente
	const renderSection = () => {
		switch (active) {
			case "bienvenidos":
				return <Inspiracion />;
			case "asistencia":
				return <Asistencia />;
			case "horarios":
				return <Horarios />;
			case "alojamientos":
				return <Alojamientos />;
			case "ubicacion":
				return <Ubicacion />;
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
									<button className={`nav-link pastel-link ${active === "ubicacion" ? "active" : ""}`} onClick={() => setActive("ubicacion")}>Ubicación</button>
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
