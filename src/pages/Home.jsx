import React, { useState, useEffect } from "react";
const STORED_SHA256_HEX = "b5cd81ff8c5709145696be8ba622519aeea01b447625e67e402c62b633b7064f"; // Hash de la contraseña

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}
import "./Home.css";
import { Inspiracion } from "./Inspiracion";
import { Asistencia } from "./Asistencia";
import { Horarios } from "./Horarios";
import HorariosAutobuses from "./HorariosAutobuses";
import { Alojamientos } from "./Alojamientos";
import { Ubicacion } from "./Ubicacion";
import MasInfo from "./MasInfo";
import CuandoDonde from "./CuandoDonde";
import CartaRoTete from "../img/cartaRoTeteSinFondo.png";
import logoTete from "../img/logotetero.png";

export const Home = () => {
  const [active, setActive] = useState("bienvenidos");
  const [selectedAllergens, setSelectedAllergens] = React.useState([]);
  const [showModal, setShowModal] = useState(true);
  const [zoomCarta, setZoomCarta] = useState(false);
  const [showPwModal, setShowPwModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwError, setPwError] = useState("");

  const handleAbrirInvitacion = () => {
    setShowPwModal(true);
  };

  const closePwModal = () => {
    setShowPwModal(false);
    setPassword("");
    setShowPassword(false);
    setPwError("");
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwError("");
    const hash = await sha256Hex(password.trim());
    if (hash === STORED_SHA256_HEX) {
      setShowPwModal(false);
      setZoomCarta(true);
      setTimeout(() => setShowModal(false), 700);
    } else {
      setPwError("Contraseña incorrecta");
    }
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
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <>
      {showModal && (
        <div className="modal-invitacion-overlay">
          <div className={`modal-carta-sola${zoomCarta ? ' zoom-in' : ''}`}> 
            <img src={CartaRoTete} alt="Sobre invitación" className="modal-sobre-img-sinborde" />
          </div>
          <div className="modal-invitacion">
            {!zoomCarta && (
              <button className="modal-invitacion-btn" onClick={handleAbrirInvitacion}>
                Abrir invitación
              </button>
            )}
          </div>

          {/* Modal de contraseña */}
          {showPwModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(30, 60, 100, 0.18)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: 'white',
                borderRadius: '1.2rem',
                boxShadow: '0 2px 24px #4682B433',
                padding: '2.1rem 1.7rem 1.5rem 1.7rem',
                minWidth: 300,
                maxWidth: '90vw',
                position: 'relative',
                textAlign: 'center',
              }}>
                <button
                  onClick={closePwModal}
                  aria-label="Cerrar"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    background: 'none',
                    border: 'none',
                    fontSize: 22,
                    color: '#4682B4',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1,
                  }}>
                  ×
                </button>
                <h4 style={{ color: '#1B5583', fontWeight: 700, marginBottom: '1.1rem', fontSize: '1.18rem', letterSpacing: '0.01em' }}>Introduce la contraseña</h4>
                <form onSubmit={handlePwSubmit}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: 220, margin: '0 auto 0.7rem auto' }}>
                    <input
                      id="pw-modal"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="Contraseña"
                      style={{ background: '#eaf3fa', color: '#1B5583', border: '1px solid #4682B4', fontSize: '1.05rem', width: '100%', textAlign: 'center', paddingRight: '2.2rem' }}
                      autoComplete="off"
                      autoFocus
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0.5rem',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        cursor: 'pointer',
                        color: '#4682B4',
                        outline: 'none',
                        height: '1.8rem',
                        width: '1.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.7 2.93-4.98 5.38-6.44m3.13-1.13A9.93 9.93 0 0 1 12 4c5 0 9.27 3.11 11 8a11.05 11.05 0 0 1-2.06 3.34M9.88 9.88A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3 0 .42-.09.82-.24 1.18"/><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m1 1 22 22"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12C2.73 7.11 7 4 12 4s9.27 3.11 11 8c-1.73 4.89-6 8-11 8S2.73 16.89 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </button>
                  </div>
                  <button type="submit"
                    className="btn rounded-3"
                    style={{ background: '#1B5583', color: 'white', border: 'none', fontWeight: 600, fontSize: '1.01rem', padding: '0.45rem 0.9rem', marginTop: '0.2rem', width: '100%' }}>
                    Acceder
                  </button>
                  {pwError && <div style={{ color: '#B00020', textAlign: 'center', marginTop: '0.7rem', fontSize: '0.98rem' }}>{pwError}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      )}
			{!showModal && (
        <div className="home-container d-flex flex-column min-vh-100">
          <nav className="navbar pastel-navbar navbar-expand-xl">
            <div className="container-fluid">
                      <a href="/" className="navbar-logo me-4" style={{textDecoration:'none'}}>
                <img src={logoTete} className="ms-3" alt="Logo Tetero" style={{height:'55px', width:'auto', display:'block'}} />
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
                    <button className={`nav-link pastel-link ${active === "cuandodonde" ? "active" : ""}`} onClick={() => handleNavClick("cuandodonde")}>Cuándo y dónde</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "horariosautobuses" ? "active" : ""}`} onClick={() => handleNavClick("horariosautobuses")}>Horarios y autobuses</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link pastel-link ${active === "asistencia" ? "active" : ""}`} onClick={() => handleNavClick("asistencia")}>Confirma tu asistencia</button>
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
