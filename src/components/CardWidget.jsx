import { useCart } from "../context/CardContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function CartWidget({ 
  cartIcon = "🛒",
  emptyMessage = "El carrito está vacío.",
  checkoutRoute = "/carrito",
  showQuantityInput = true,
  showClearButton = true
}) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const widgetRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const cantidadTotal = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div ref={widgetRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          fontSize: 24,
        }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir carrito"
      >
        {cartIcon}
        {cantidadTotal > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-12px",
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 7px",
              fontSize: "0.8em",
            }}
          >
            {cantidadTotal}
          </span>
        )}
      </button>
      <div
        style={{
          transition: "all 0.3s ease",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          position: "absolute",
          right: 0,
          top: 40,
          minWidth: 380,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
          borderRadius: 8,
          zIndex: 99,
          padding: 16,
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>Carrito</h4>
        {cart.length === 0 ? (
          <div style={{ color: "#888", marginBottom: 8 }}>
            {emptyMessage}
          </div>
        ) : (
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            <table style={{ width: "100%", fontSize: "0.80em", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th align="left" style={{ borderBottom: "1px solid #eee", paddingBottom: 4 }}>Producto</th>
                  <th align="right" style={{ borderBottom: "1px solid #eee", paddingBottom: 4 }}>Precio</th>
                  <th align="center" style={{ borderBottom: "1px solid #eee", paddingBottom: 4 }}>Cantidad</th>
                  <th align="right" style={{ borderBottom: "1px solid #eee", paddingBottom: 4 }}>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td style={{ padding: "4px 0" }}>{item.title}</td>
                    <td align="right">${item.price}</td>
                    <td align="center">
                      {showQuantityInput ? (
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, Number(e.target.value))}
                          style={{
                            width: 42,
                            padding: "2px 4px",
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            textAlign: "center",
                          }}
                        />
                      ) : (
                        <span>{item.quantity}</span>
                      )}
                    </td>
                    <td align="right">${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: 4,
                          background: "none",
                          border: "none",
                          color: "red",
                          cursor: "pointer",
                          fontSize: 18,
                        }}
                        title="Eliminar"
                        aria-label={`Eliminar ${item.title} del carrito`}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", fontWeight: "bold", marginTop: 12 }}>
              Total: ${getTotal().toFixed(2)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              {showClearButton && (
                <button
                  onClick={clearCart}
                  style={{
                    background: "#eee",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Vaciar
                </button>
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  navigate(checkoutRoute);
                }}
                style={{
                  background: "#0071e3",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CartWidget.propTypes = {
  cartIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  checkoutRoute: PropTypes.string,
  showQuantityInput: PropTypes.bool,
  showClearButton: PropTypes.bool,
};

CartWidget.defaultProps = {
  cartIcon: "🛒",
  emptyMessage: "El carrito está vacío.",
  checkoutRoute: "/carrito",
  showQuantityInput: true,
  showClearButton: true,
};