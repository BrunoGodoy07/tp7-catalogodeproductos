import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarProductoPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: ""
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) {
      setMensaje("Por favor, completa los campos obligatorios.");
      return;
    }
    // Crea el objeto producto
    const nuevoProducto = {
      ...form,
      id: Date.now(), // ID único
      price: Number(form.price)
    };
    // Lee los productos locales actuales
    const guardados = localStorage.getItem("productosLocales");
    const productosLocales = guardados ? JSON.parse(guardados) : [];
    // Agrega el nuevo producto
    productosLocales.unshift(nuevoProducto);
    // Guarda en localStorage
    localStorage.setItem("productosLocales", JSON.stringify(productosLocales));
    setMensaje("¡Producto agregado!");
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      thumbnail: ""
    });
    // Opcional: redirigir al catálogo después de un segundo
    setTimeout(() => navigate("/productos"), 1000);
  }

  return (
    <section style={{ maxWidth: 400, margin: "32px auto" }}>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Nombre*"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio*"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Categoría*"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="thumbnail"
          placeholder="URL Imagen"
          value={form.thumbnail}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
      {mensaje && <div style={{ color: "#0071e3", marginTop: 10 }}>{mensaje}</div>}
    </section>
  );
}