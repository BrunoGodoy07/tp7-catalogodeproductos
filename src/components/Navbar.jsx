import { NavLink } from "react-router-dom";
import { useCart } from "../context/CardContext.jsx";

export default function Navbar() {
  const { cart } = useCart();
  const cantidadTotal = cart.reduce((acc, p) => acc + p.quantity, 0);

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
          <NavLink to="/carrito" className={({ isActive }) => isActive ? "active" : ""} style={{ position: "relative" }}>
            <span role="img" aria-label="carrito" style={{ fontSize: 24 }}>🛒</span>
            {cantidadTotal > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-12px",
                background: "red", color: "#fff", borderRadius: "50%", padding: "2px 7px", fontSize: "0.8em"
              }}>
                {cantidadTotal}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}