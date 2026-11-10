import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { puedeVer } from "../config/permisos";

// 1) Sin sesión -> /login
// 2) Con sesión pero sin permiso para esta página -> Inicio
function RutaProtegida() {
  const { sesion } = useAuth();
  const { pathname } = useLocation();

  if (!sesion) return <Navigate to="/login" replace />;
  if (!puedeVer(sesion.rol, pathname)) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default RutaProtegida;
