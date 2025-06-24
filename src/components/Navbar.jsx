import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategorias(Array.isArray(data) ? data : []))
      .catch(() => setCategorias([])); // en caso de error, array vacío
  }, []);

  // Función segura para capitalizar
  function capitalizar(cat) {
    if (typeof cat !== "string") return "";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/quienes-somos" className={({ isActive }) => isActive ? "active" : ""}>Quiénes somos</NavLink>
        </li>
        <li tabIndex={0}>
          <span style={{ cursor: "pointer" }}>Productos</span>
          <ul>
            <li>
              <NavLink to="/productos" className={({ isActive }) => isActive ? "active" : ""}>Ver todos</NavLink>
            </li>
            {categorias.map(cat => (
              <li key={cat}>
                <NavLink
                  to={`/productos/categoria/${cat}`}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  {capitalizar(cat)}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/agregar-producto" className={({ isActive }) => isActive ? "active" : ""}>
                + Agregar producto
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>Contacto</NavLink>
        </li>
      </ul>
    </nav>
  );
}