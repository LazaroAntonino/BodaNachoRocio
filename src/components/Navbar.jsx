import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

const navItems = [
  { name: "Bienvenidos", path: "/inspiracion" },
  { name: "Confirma tu asistencia", path: "/asistencia" },
  { name: "Horarios y autobuses", path: "/horarios" },
  { name: "Alojamientos", path: "/alojamientos" },
  { name: "Contáctanos", path: "/contacto" },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-n">N</span>
        <span className="logo-plus">+</span>
        <span className="logo-r">R</span>
      </div>
      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={
                location.pathname === item.path ? "active" : ""
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
