import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [query, setQuery] = useState("");
  const [orden, setOrden] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  
  useEffect(() => {
    setLoading(true);
    let url = "https://dummyjson.com/products";
    if (categoriaSeleccionada) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(categoriaSeleccionada)}`;
    } else if (query) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setProductos(data.products || data))
      .finally(() => setLoading(false));
  }, [query, categoriaSeleccionada]);

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(busqueda.trim());
    setCategoriaSeleccionada(""); 
  }

  function ordenarProductos(productos) {
    const productosOrdenados = [...productos];
    switch (orden) {
      case "precio-mayor":
        productosOrdenados.sort((a, b) => b.price - a.price);
        break;
      case "precio-menor":
        productosOrdenados.sort((a, b) => a.price - b.price);
        break;
      case "nombre-asc":
        productosOrdenados.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nombre-desc":
        productosOrdenados.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return productosOrdenados;
  }

  const productosAMostrar = ordenarProductos(productos);

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
        Productos {categoriaSeleccionada ? `de ${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}` : "del catálogo"}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 24,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ padding: 8, width: 220, border: "1px solid #ccc", borderRadius: 5, fontSize: 16 }}
          disabled={!!categoriaSeleccionada}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#0071e3",
            color: "white",
            border: "none",
            borderRadius: 5,
            fontSize: 16,
            cursor: "pointer"
          }}
          disabled={!!categoriaSeleccionada}
        >
          Buscar
        </button>
        
        <select
          value={orden}
          onChange={e => setOrden(e.target.value)}
          style={{ padding: 8, borderRadius: 5, fontSize: 16, border: "1px solid #ccc" }}
        >
          <option value="">Ordenar por…</option>
          <option value="precio-mayor">Precio: mayor a menor</option>
          <option value="precio-menor">Precio: menor a mayor</option>
          <option value="nombre-asc">Nombre: A-Z</option>
          <option value="nombre-desc">Nombre: Z-A</option>
        </select>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {productosAMostrar.length === 0 ? (
          <div>No se encontraron productos.</div>
        ) : (
          productosAMostrar.map((prod) => (
            <ProductCard key={prod.id} producto={prod} />
          ))
        )}
      </div>
    </section>
  );
}