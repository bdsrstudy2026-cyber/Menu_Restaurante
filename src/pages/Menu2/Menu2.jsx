import { useState } from "react";

function Menu2() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [propietarios, setPropietarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const guardarPropietario = () => {
    if (nombre.trim() === "" || telefono.trim() === "" || correo.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editandoId) {
      // Actualizar registro existente
      const listaActualizada = propietarios.map((propietario) =>
        propietario.id === editandoId
          ? { ...propietario, nombre, telefono, correo }
          : propietario
      );

      setPropietarios(listaActualizada);
      setEditandoId(null);
    } else {
      // Crear nuevo registro (Date.now() se llama de forma segura aquí dentro)
      const nuevo = {
        id: Date.now(),
        nombre,
        telefono,
        correo,
      };

      setPropietarios([...propietarios, nuevo]);
    }

    limpiarFormulario();
  };

  const editarPropietario = (propietario) => {
    setNombre(propietario.nombre);
    setTelefono(propietario.telefono);
    setCorreo(propietario.correo);
    setEditandoId(propietario.id);
  };

  const eliminarPropietario = (id) => {
    const listaNueva = propietarios.filter(
      (propietario) => propietario.id !== id
    );
    setPropietarios(listaNueva);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setCorreo("");
    setEditandoId(null);
  };

  return (
    <div className="contenedor">
      <h1>Menu2</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <button onClick={guardarPropietario}>
          {editandoId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <h2>Registros</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propietarios.map((propietario) => (
            <tr key={propietario.id}>
              <td>{propietario.id}</td>
              <td>{propietario.nombre}</td>
              <td>{propietario.telefono}</td>
              <td>{propietario.correo}</td>
              <td>
                <button
                  className="editar"
                  onClick={() => editarPropietario(propietario)}
                >
                  Editar
                </button>

                <button
                  className="eliminar"
                  onClick={() => eliminarPropietario(propietario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu2;