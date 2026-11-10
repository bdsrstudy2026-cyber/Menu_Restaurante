import { createContext, useContext, useState } from "react";

// "Base de datos" falsa: usuarios escritos directamente en el código.
const USUARIOS = [
  { usuario: "admin1", clave: "1234", rol: "admin1" },
  { usuario: "admin2", clave: "1234", rol: "admin2" },
  { usuario: "admin3", clave: "1234", rol: "admin3" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Si ya había sesión guardada en el navegador, la recupera al recargar
  const [sesion, setSesion] = useState(() => {
    try {
      const guardada = JSON.parse(localStorage.getItem("sesion"));
      // Descarta sesiones viejas cuyo rol ya no existe (evita bucles de redirección)
      return USUARIOS.some((u) => u.rol === guardada?.rol) ? guardada : null;
    } catch {
      return null;
    }
  });

  function login(usuario, clave) {
    const encontrado = USUARIOS.find(
      (u) => u.usuario === usuario && u.clave === clave
    );
    if (!encontrado) return false;

    const datos = { usuario: encontrado.usuario, rol: encontrado.rol };
    setSesion(datos);
    localStorage.setItem("sesion", JSON.stringify(datos));
    return true;
  }

  function logout() {
    setSesion(null);
    localStorage.removeItem("sesion");
  }

  return (
    <AuthContext.Provider value={{ sesion, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
