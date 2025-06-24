import { useState } from "react";

export default function AgregarProducto({ onProductoAgregado }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: ""
  });
  const [mensaje, setMensaje] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validación básica
    if (!form.title || !form.price || !form.category) {
      setMensaje("Por favor, completa los campos obligatorios.");
      return;
    }

    // Simulación de POST (ya que dummyjson solo permite GET)
    let productoNuevo = {
      ...form,
      id: Date.now(),
      price: Number(form.price)
    };
    // Llama al callback para añadir el producto localmente
    onProductoAgregado(productoNuevo);
    setMensaje("¡Producto agregado!");
    setForm({ title: "", description: "", price: "", category: "", thumbnail: "" });
  }

  return (
    <section>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <input
          type="text"
          name="title"
          placeholder="Nombre del producto*"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio*"
          value={form.price}
          onChange={handleChange}
          required
          min={0}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría*"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="URL de imagen"
          value={form.thumbnail}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
        {mensaje && <div style={{ marginTop: 10, color: "#0071e3" }}>{mensaje}</div>}
      </form>
    </section>
  );
}