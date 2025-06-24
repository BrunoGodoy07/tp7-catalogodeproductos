import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/quienes-somos" className={({ isActive }) => isActive ? "active" : ""}>
            Quiénes somos
          </NavLink>
        </li>
        <li>
          <NavLink to="/productos" className={({ isActive }) => isActive ? "active" : ""}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/agregar-producto" className={({ isActive }) => isActive ? "active" : ""}>
            Agregar productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}