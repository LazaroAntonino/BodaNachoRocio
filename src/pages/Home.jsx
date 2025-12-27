import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { Inspiracion } from "./Inspiracion";

export const Home = () => {
	const [active, setActive] = useState("bienvenidos");

	// Mapear cada sección a su componente
	const renderSection = () => {
		switch (active) {
			case "bienvenidos":
				return <Inspiracion />;
			case "asistencia":
				return <div className="section-placeholder">Confirma tu asistencia (próximamente)</div>;
			case "horarios":
				return <div className="section-placeholder">Horarios y autobuses (próximamente)</div>;
			case "alojamientos":
				return <div className="section-placeholder">Alojamientos (próximamente)</div>;
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
						<span className="logo-n">N</span>
						<span className="logo-plus">+</span>
						<span className="logo-r">R</span>
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
