import React, { useState, useEffect } from "react";
import "./Home.css";
import { Inspiracion } from "./Inspiracion";
import { Asistencia } from "./Asistencia";
import { Horarios } from "./Horarios";
import HorariosAutobuses from "./HorariosAutobuses";
import { Alojamientos } from "./Alojamientos";
import { Ubicacion } from "./Ubicacion";
import MasInfo from "./MasInfo";
import CuandoDonde from "./CuandoDonde";

export const Home = () => {
  const [active, setActive] = useState("bienvenidos");
  const [selectedAllergens, setSelectedAllergens] = React.useState([]);
  const [showModal, setShowModal] = useState(true);
  const [zoomCarta, setZoomCarta] = useState(false);

  const handleAbrirInvitacion = () => {
    setZoomCarta(true);
    setTimeout(() => setShowModal(false), 700);
  };


	// Mapear cada sección a su componente
	const renderSection = () => {
		switch (active) {
			case "bienvenidos":
               return <Inspiracion />;
       case "cuandodonde":
         return <CuandoDonde />;
       case "asistencia":
         return <Asistencia />;
       case "horariosautobuses":
         return <HorariosAutobuses />;
       case "horarios":
         return <Horarios />;
       case "alojamientos":
         return <Alojamientos />;
       case "ubicacion":
         return <Ubicacion />;
       case "masinfo":
         return <MasInfo />;
       case "contacto":
         return <div className="section-placeholder">Contáctanos (próximamente)</div>;
       default:
         return null;
		}
	};

  // Cierra el menú del navbar si está abierto (modo móvil)
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('mainNavbar');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  const handleNavClick = (section) => {
    setActive(section);
    closeNavbar();
  };

  return (
    <>
      {showModal && (
        <div className="modal-invitacion-overlay">
          <div className={`modal-carta-sola${zoomCarta ? ' zoom-in' : ''}`}>
            <img src="/sobre-invitacion-rn.png" alt="Sobre invitación" className="modal-sobre-img-sinborde" />
          </div>
          <div className="modal-invitacion">
            {!zoomCarta && (
              <button className="modal-invitacion-btn marron" onClick={handleAbrirInvitacion}>
                Abrir invitación
              </button>
            )}
          </div>
        </div>
      )}
			{!showModal && (
        <div className="home-container d-flex flex-column min-vh-100">
          <nav className="navbar pastel-navbar navbar-expand-xl">
            <div className="container-fluid">
				              <a href="/" className="navbar-logo me-4" style={{textDecoration:'none'}}>
				                <span className="logo-n">R</span>
				                <span className="logo-plus">&</span>
				                <span className="logo-r">N</span>
				              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="mainNavbar">
                <ul className="navbar-links navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "bienvenidos" ? "active" : ""}`} onClick={() => handleNavClick("bienvenidos")}>¡Bienvenidos!</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "cuandodonde" ? "active" : ""}`} onClick={() => handleNavClick("cuandodonde")}>Cuándo y Dónde</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "horariosautobuses" ? "active" : ""}`} onClick={() => handleNavClick("horariosautobuses")}>Horarios y Autobuses</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "asistencia" ? "active" : ""}`} onClick={() => handleNavClick("asistencia")}>Confirma tu Asistencia</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "alojamientos" ? "active" : ""}`} onClick={() => handleNavClick("alojamientos")}>Alojamientos</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "masinfo" ? "active" : ""}`} onClick={() => handleNavClick("masinfo")}>Más información</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <main className="home-content container-fluid px-2 px-md-4 py-3 flex-grow-1">
            {renderSection()}
          </main>
        </div>
      )}
		</>
	);
};
