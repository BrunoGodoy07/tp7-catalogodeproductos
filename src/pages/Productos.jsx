import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = "https://dummyjson.com/products";
    if (idCategoria) {
      url = `https://dummyjson.com/products/category/${idCategoria}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setProductos(data.products || data))
      .finally(() => setLoading(false));
  }, [idCategoria]);

  if (loading) return (
    <section>
      <div style={{ textAlign: "center", padding: "2rem" }}>Cargando productos...</div>
    </section>
  );

  return (
    <section>
      <h2>{idCategoria ? `Productos de ${idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1)}` : "Todos los productos"}</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {productos.map(prod => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </section>
  );
}