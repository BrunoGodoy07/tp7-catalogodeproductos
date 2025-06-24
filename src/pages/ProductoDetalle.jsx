import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductoDetalle() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esLocal, setEsLocal] = useState(false);

  useEffect(() => {
    // Primero busca en localStorage
    const productosLocales = JSON.parse(localStorage.getItem("productosLocales") || "[]");
    const encontrado = productosLocales.find(p => String(p.id) === String(idProducto));
    if (encontrado) {
      setProducto(encontrado);
      setEsLocal(true);
      setLoading(false);
    } else {
      // Si no está, busca en la API
      setEsLocal(false);
      fetch(`https://dummyjson.com/products/${idProducto}`)
        .then(res => res.json())
        .then(data => setProducto(data))
        .catch(() => setProducto(null))
        .finally(() => setLoading(false));
    }
  }, [idProducto]);

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Cargando producto...</div>;
  if (!producto) return <div style={{ textAlign: "center", padding: "2rem" }}>Producto no encontrado.</div>;

  return (
    <section style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>{producto.title}</h2>
      <img
        src={producto.thumbnail || "https://placehold.co/400x300?text=Sin+Imagen"}
        alt={producto.title}
        style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 16 }}
      />
      <p><strong>Descripción:</strong> {producto.description || "Sin descripción"}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <p><strong>Categoría:</strong> {producto.category}</p>
      {esLocal && <span style={{ color: "#0071e3" }}>(Producto agregado por el usuario)</span>}
    </section>
  );
}