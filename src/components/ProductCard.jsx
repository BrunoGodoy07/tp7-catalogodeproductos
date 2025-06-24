import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  const esLocal = Number(producto.id) > 1000000 || producto.id.toString().length > 6;

  return (
    <div className="product-card" style={{ border: esLocal ? "2px solid #0071e3" : "1px solid #ccc" }}>
      <img
        src={producto.thumbnail || "https://via.placeholder.com/150"}
        alt={producto.title}
        width={150}
        height={150}
        onError={e => { e.target.src = "https://via.placeholder.com/150"; }}
      />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
      <Link to={`/productos/${producto.id}`}>Ver detalle</Link>
      {esLocal ? (
        <div style={{ marginTop: 8, color: "#0071e3", fontWeight: "bold", fontSize: 14 }}>
          Producto agregado por el usuario
        </div>
      ) : (
        <div style={{ marginTop: 8, color: "#888", fontSize: 12 }}>
          Producto oficial del catálogo
        </div>
      )}
    </div>
  );
}