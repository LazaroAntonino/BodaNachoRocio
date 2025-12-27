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
		<div className="home-container d-flex flex-column">
			<nav className="navbar">
				<div className="navbar-logo">
					<span className="logo-n">N</span>
					<span className="logo-plus">+</span>
					<span className="logo-r">R</span>
				</div>
				<ul className="navbar-links">
					<li>
						<button
							className={active === "bienvenidos" ? "active" : ""}
							onClick={() => setActive("bienvenidos")}
						>
							Bienvenidos
						</button>
					</li>
					<li>
						<button
							className={active === "asistencia" ? "active" : ""}
							onClick={() => setActive("asistencia")}
						>
							Confirma tu asistencia
						</button>
					</li>
					<li>
						<button
							className={active === "horarios" ? "active" : ""}
							onClick={() => setActive("horarios")}
						>
							Horarios y autobuses
						</button>
					</li>
					<li>
						<button
							className={active === "alojamientos" ? "active" : ""}
							onClick={() => setActive("alojamientos")}
						>
							Alojamientos
						</button>
					</li>
					<li>
						<button
							className={active === "contacto" ? "active" : ""}
							onClick={() => setActive("contacto")}
						>
							Contáctanos
						</button>
					</li>
				</ul>
			</nav>
			<div className="home-content">
				{renderSection()}
			</div>
		</div>
	);
};
