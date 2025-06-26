import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para productos locales (persistentes)
  const [productosLocales, setProductosLocales] = useState([]);

  // Leer productos locales desde localStorage al montar
  useEffect(() => {
    const guardados = localStorage.getItem("productosLocales");
    if (guardados) {
      setProductosLocales(JSON.parse(guardados));
    }
  }, []);

  // Guardar productosLocales cada vez que cambian
  useEffect(() => {
    localStorage.setItem("productosLocales", JSON.stringify(productosLocales));
  }, [productosLocales]);

  // Obtener productos de la API
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

  // Eliminar producto local por id
  const eliminarProductoLocal = (id) => {
    setProductosLocales(productosLocales.filter(p => p.id !== id));
  };

  // Filtro de categoría para productos locales
  const productosLocalesFiltrados = idCategoria
    ? productosLocales.filter(
        p =>
          p.category &&
          p.category.trim().toLowerCase() === idCategoria.trim().toLowerCase()
      )
    : productosLocales;

  // Combina productos agregados + productos de la API
  const todosLosProductos = [...productosLocalesFiltrados, ...productos];

  if (loading)
    return (
      <section>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Cargando productos...
        </div>
      </section>
    );

  return (
    <section>
      <h2>
        {idCategoria
          ? `Productos de ${idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1)}`
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
          <ProductCard
            key={prod.id}
            producto={prod}
            // Solo los productos locales pueden ser eliminados
            onEliminar={
              Number(prod.id) > 1000000 || prod.id.toString().length > 6
                ? () => eliminarProductoLocal(prod.id)
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}