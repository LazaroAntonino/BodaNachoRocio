import React from "react";
import { Outlet } from "react-router-dom";

// Puedes agregar aquí tu Navbar y Footer si lo deseas
const Layout = () => {
  return (
    <>
      {/* Navbar aquí si tienes uno */}
      <Outlet />
      {/* Footer aquí si tienes uno */}
    </>
  );
};

export { Layout };
