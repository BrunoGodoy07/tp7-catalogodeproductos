import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const { idCategoria } = useParams();
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productosLocales, setProductosLocales] = useState([]);

  // Al montar, lee los productos locales de localStorage
  useEffect(() => {
    const guardados = localStorage.getItem("productosLocales");
    setProductosLocales(guardados ? JSON.parse(guardados) : []);
  }, [location]);

  // Cada vez que cambia la categoría, trae los productos de la API
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

  if (loading)
    return (
      <section>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Cargando productos...
        </div>
      </section>
    );

  // Filtro por categoría para los productos locales
  const productosLocalesFiltrados = idCategoria
    ? productosLocales.filter(
        p =>
          p.category &&
          p.category.trim().toLowerCase() === idCategoria.trim().toLowerCase()
      )
    : productosLocales;

  // Combina productos locales + productos de la API
  const todosLosProductos = [...productosLocalesFiltrados, ...productos];

  return (
    <section>
      <h2>
        {idCategoria
          ? `Productos de ${
              idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1)
            }`
          : "Todos los productos"}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {todosLosProductos.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </section>
  );
}