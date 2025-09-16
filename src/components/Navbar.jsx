import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import CartWidget from "./CardWidget.jsx";

export default function Navbar({ 
  menuItems = [
    { path: "/", label: "Home" },
    { path: "/quienes-somos", label: "Quiénes somos" },
    { path: "/productos", label: "Productos" },
    { path: "/contacto", label: "Contacto" }
  ],
  showCartWidget = true,
  cartWidgetPosition = "right"
}) {
  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {showCartWidget && (
          <li style={{ marginLeft: cartWidgetPosition === "right" ? 24 : 0 }}>
            <CartWidget />
          </li>
        )}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  showCartWidget: PropTypes.bool,
  cartWidgetPosition: PropTypes.oneOf(['left', 'right']),
};

Navbar.defaultProps = {
  menuItems: [
    { path: "/", label: "Home" },
    { path: "/quienes-somos", label: "Quiénes somos" },
    { path: "/productos", label: "Productos" },
    { path: "/contacto", label: "Contacto" }
  ],
  showCartWidget: true,
  cartWidgetPosition: "right",
};