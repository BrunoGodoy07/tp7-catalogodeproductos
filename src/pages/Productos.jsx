import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import AgregarProducto from "./AgregarProducto";

export default function Productos() {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productosLocales, setProductosLocales] = useState([]);

  // Leer productos locales de localStorage al montar
  useEffect(() => {
    const guardados = localStorage.getItem("productosLocales");
    if (guardados) {
      setProductosLocales(JSON.parse(guardados));
    }
  }, []);

  // Guardar productosLocales en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("productosLocales", JSON.stringify(productosLocales));
  }, [productosLocales]);

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

  function handleAgregarProducto(producto) {
    setProductosLocales(prev => [producto, ...prev]);
  }

  if (loading) return (
    <section>
      <div style={{ textAlign: "center", padding: "2rem" }}>Cargando productos...</div>
    </section>
  );

  // Filtrar productos locales por categoría si corresponde (case-insensitive)
  const productosLocalesFiltrados = idCategoria
    ? productosLocales.filter(
        p => p.category && p.category.toLowerCase() === idCategoria.toLowerCase()
      )
    : productosLocales;

  // Combina productos locales filtrados con los de la API (los locales primero)
  const todosLosProductos = [...productosLocalesFiltrados, ...productos];

  return (
    <section>
      <h2>{idCategoria ? `Productos de ${idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1)}` : "Todos los productos"}</h2>
      <AgregarProducto onProductoAgregado={handleAgregarProducto} />
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {todosLosProductos.map(prod => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </section>
  );
}