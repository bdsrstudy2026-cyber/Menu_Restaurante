import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PAGINAS } from "../config/permisos";
import "./Navbar.css";

function Navbar() {
const { sesion, logout } = useAuth();
const navigate = useNavigate();

function salir() {
logout();
navigate("/login");
}

return (
<nav className="navbar">
<h2>Menus</h2>

<ul>
{PAGINAS.filter((p) => p.roles.includes(sesion.rol)).map((p) => (
<li key={p.ruta}>
<Link to={p.ruta}>{p.texto}</Link>
</li>
))}
</ul>

<div className="navbar-usuario">
<span>{sesion.rol}</span>
<button onClick={salir}>Salir</button>
</div>
</nav>
);
}

export default Navbar;
