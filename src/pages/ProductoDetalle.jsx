import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductoDetalle() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .finally(() => setLoading(false));
  }, [idProducto]);

  if (loading) return (
    <section>
      <div style={{ textAlign: "center", padding: "2rem" }}>Cargando detalle...</div>
    </section>
  );
  if (!producto) return (
    <section>
      <div style={{ textAlign: "center", padding: "2rem" }}>Producto no encontrado</div>
    </section>
  );

  return (
    <section>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center", justifyContent: "center" }}>
        <img
          src={producto.images?.[0] || "https://via.placeholder.com/200"}
          alt={producto.title}
          width={220}
          height={220}
          style={{ borderRadius: "14px", background: "#ececec", objectFit: "cover" }}
        />
        <div>
          <h2 style={{ marginBottom: ".8rem" }}>{producto.title}</h2>
          <p style={{ fontWeight: "bold", fontSize: "1.35rem", color: "#0071e3" }}>Precio: ${producto.price}</p>
          <p style={{ margin: "1rem 0" }}>{producto.description}</p>
          <p style={{ color: "#6e6e73" }}>Categoría: <b>{producto.category}</b></p>
        </div>
      </div>
    </section>
  );
}