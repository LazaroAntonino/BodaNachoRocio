import { createContext, useContext, useState } from "react";

const AmorContext = createContext(null);

export function AmorProvider({ children }) {
  // Lazy initializer: lee localStorage en el primer render → evita el flash
  // de la pantalla de login para usuarios ya autenticados
  const [user, setUserState] = useState(() => {
    try {
      const stored = localStorage.getItem("amor_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setUser = (userData) => {
    setUserState(userData);
    localStorage.setItem("amor_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("amor_user");
  };

  return (
    <AmorContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AmorContext.Provider>
  );
}

export function useAmor() {
  const ctx = useContext(AmorContext);
  if (!ctx) throw new Error("useAmor debe usarse dentro de <AmorProvider>");
  return ctx;
}
