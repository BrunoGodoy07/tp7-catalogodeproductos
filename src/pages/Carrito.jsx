import { useCart } from "../context/CardContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleComprar = () => {
    clearCart();
    navigate("/compra-exitosa");
  };

  if (cart.length === 0) return <div style={{ textAlign: "center", margin: "3rem" }}>El carrito está vacío.</div>;

  return (
    <section style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Mi Carrito</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc" }}>Producto</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Precio</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Cantidad</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item =>
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                  style={{ width: 50 }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <strong>
          Total: $
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </strong>
      </div>
      <button onClick={handleComprar}>Comprar</button>
    </section>
  );
}