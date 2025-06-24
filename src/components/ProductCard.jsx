import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  return (
    <div className="product-card">
      <img
        src=""
        // src={producto.thumbnail || "https://via.placeholder.com/150"}
        alt={producto.title}
        width={150}
        height={150}
      />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
      <Link to={`/productos/${producto.id}`}>Ver detalle</Link>
    </div>
  );
}