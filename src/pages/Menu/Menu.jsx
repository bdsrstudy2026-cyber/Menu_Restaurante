import { useState } from "react";
import "./Menu.css"; // Importamos los estilos de esta vista[cite: 9]

function Menu() {
  // 1. ESTADO DEL FORMULARIO: Aquí React guarda temporalmente lo que se va escribiendo en cada caja
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: ""
  });

  // 2. ESTADO DE LA LISTA: Aquí se van acumulando todos los platos que ya guardaste
  const [listaPlatos, setListaPlatos] = useState([]);

  // 3. FUNCIÓN PARA CAPTURAR LO QUE ESCRIBES: Se activa cada vez que tecleas en un input
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario, // Mantiene intactos los demás campos que ya habías llenado
      [e.target.name]: e.target.value // Actualiza solo el campo donde estás escribiendo
    });
  };

  // 4. FUNCIÓN AL ENVIAR EL FORMULARIO: Se activa al darle clic al botón "Guardar Plato"
  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que la página se recargue y se pierdan los datos

    // Creamos el plato nuevo agregándole un identificador único (id)
    const nuevoPlato = {
      id: Date.now(),
      ...formulario
    };

    // Agregamos el plato nuevo a la lista que ya teníamos
    setListaPlatos([...listaPlatos, nuevoPlato]);

    // Limpiamos las cajas del formulario para dejarlo listo para otro plato
    setFormulario({
      nombre: "",
      categoria: "",
      precio: "",
      descripcion: ""
    });
  };

  // 5. FUNCIÓN PARA ELIMINAR UN PLATO DE LA LISTA
  const eliminarPlato = (id) => {
    const listaActualizada = listaPlatos.filter((plato) => plato.id !== id);
    setListaPlatos(listaActualizada);
  };

  // 6. LO QUE SE DIBUJA EN PANTALLA (HTML mezclado con JavaScript = JSX)
  return (
    <div className="menu-contenedor">
      <h1>Gestión del Menú</h1>

      {/* FORMULARIO */}
      <form onSubmit={manejarEnvio} className="menu-formulario">
        <div>
          <label>Nombre del plato:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ej: Churrasco"
            required
          />
        </div>

        <div>
          <label>Categoría:</label>
          <select
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona una opción...</option>
            <option value="Entradas">Entradas</option>
            <option value="Platos Fuertes">Platos Fuertes</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Postres">Postres</option>
          </select>
        </div>

        <div>
          <label>Precio ($):</label>
          <input
            type="number"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
            placeholder="Ej: 32000"
            required
          />
        </div>

        <div>
          <label>Descripción / Ingredientes:</label>
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            placeholder="Ej: Corte de res de 300g con papas a la francesa..."
          />
        </div>

        <button type="submit">Guardar Plato</button>
      </form>

      <hr />

      {/* TABLA DE PLATOS REGISTRADOS */}
      <h2>Platos en la Carta ({listaPlatos.length})</h2>
      
      {listaPlatos.length === 0 ? (
        <p>Aún no hay platos registrados. ¡Agrega el primero arriba!</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Plato</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {listaPlatos.map((plato) => (
              <tr key={plato.id}>
                <td>{plato.nombre}</td>
                <td>{plato.categoria}</td>
                <td>${plato.precio}</td>
                <td>{plato.descripcion}</td>
                <td>
                  <button onClick={() => eliminarPlato(plato.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Menu;