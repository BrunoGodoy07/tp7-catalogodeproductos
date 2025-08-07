import { useCart } from "../context/CardContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function CartWidget() {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const widgetRef = useRef();

  // Cierre al click fuera
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
        🛒
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
          minWidth: 320,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
          borderRadius: 8,
          zIndex: 99,
          padding: 16,
        }}
      >
        <h4>Carrito</h4>
        {cart.length === 0 ? (
          <div style={{ color: "#888", marginBottom: 8 }}>
            El carrito está vacío.
          </div>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cart.map((item) => (
                <li key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span>
                    {item.title} ({item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: 8,
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <div style={{ textAlign: "right", fontWeight: "bold", marginTop: 8 }}>
              Total: ${getTotal().toFixed(2)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
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
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/carrito");
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
          </>
        )}
      </div>
    </div>
  );
}