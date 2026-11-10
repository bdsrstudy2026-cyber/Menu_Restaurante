import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { sesion, login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  // Si ya inició sesión, no tiene sentido ver el login
  if (sesion) return <Navigate to="/" replace />;

  function enviar(e) {
    e.preventDefault();
    if (login(usuario.trim(), clave)) {
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={enviar}>
        <h1>Sistemas de menus</h1>
        <p>Inicia sesión para continuar</p>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        {error && <span className="login-error">{error}</span>}

        <button type="submit">Entrar</button>

        <small>
          Pruebas: admin1 / admin2 / admin3 — clave 1234
        </small>
      </form>
    </div>
  );
}

export default Login;
