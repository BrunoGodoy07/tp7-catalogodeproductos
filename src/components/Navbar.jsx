import { NavLink } from "react-router-dom";
import CartWidget from "./CardWidget.jsx";

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
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>
            Contacto
          </NavLink>
        </li>
        <li style={{ marginLeft: 24 }}>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
}