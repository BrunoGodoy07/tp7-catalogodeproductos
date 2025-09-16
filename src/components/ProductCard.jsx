import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard({ 
  producto, 
  onEliminar, 
  showLocalIndicator = true,
  detailLinkText = "Ver detalle"
}) {
  const esLocal = Number(producto.id) > 1000000 || producto.id.toString().length > 6;

  function handleImgError(e) {
    if (!e.target.dataset.fallback) {
      e.target.src = "/fallback.png";
      e.target.dataset.fallback = "true";
    }
  }

  return (
    <div 
      className="product-card" 
      style={{ 
        border: esLocal ? "2px solid #0071e3" : "1px solid #ccc", 
        position: "relative" 
      }}
    >
      <img
        src={producto.thumbnail || "/fallback.png"}
        alt={producto.title}
        width={150}
        height={150}
        onError={handleImgError}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
      <Link to={`/productos/${producto.id}`}>{detailLinkText}</Link>
      
      {showLocalIndicator && (
        esLocal ? (
          <div style={{ 
            marginTop: 8, 
            color: "#0071e3", 
            fontWeight: "bold", 
            fontSize: 14 
          }}>
            Producto agregado por el usuario
          </div>
        ) : (
          <div style={{ 
            marginTop: 8, 
            color: "#888", 
            fontSize: 12 
          }}>
            Producto oficial del catálogo
          </div>
        )
      )}
      
      {esLocal && onEliminar && (
        <button
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#eee",
            border: "1px solid #e00",
            color: "#e00",
            borderRadius: 6,
            padding: "2px 8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={onEliminar}
          aria-label="Eliminar producto"
        >
          X
        </button>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
  onEliminar: PropTypes.func,
  showLocalIndicator: PropTypes.bool,
  detailLinkText: PropTypes.string,
};