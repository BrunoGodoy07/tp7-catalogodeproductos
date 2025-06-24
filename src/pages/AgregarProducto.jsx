import { useState } from "react";

export default function AgregarProducto({
  onProductoAgregado,
  form,
  setForm,
  showTitle = true
}) {
  const [mensaje, setMensaje] = useState("");

  // Si no pasan form y setForm, usa estado interno (para retrocompatibilidad)
  const [internalForm, setInternalForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: ""
  });
  const usedForm = form ?? internalForm;
  const setUsedForm = setForm ?? setInternalForm;

  function handleChange(e) {
    const nuevoForm = { ...usedForm, [e.target.name]: e.target.value };
    setUsedForm(nuevoForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!usedForm.title || !usedForm.price || !usedForm.category) {
      setMensaje("Por favor, completa los campos obligatorios.");
      return;
    }
    let productoNuevo = {
      ...usedForm,
      id: Date.now(),
      price: Number(usedForm.price)
    };
    onProductoAgregado(productoNuevo);
    setMensaje("¡Producto agregado!");
    setUsedForm({
      title: "",
      description: "",
      price: "",
      category: "",
      thumbnail: ""
    });
  }

  return (
    <section>
      {showTitle && <h2>Agregar producto</h2>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <input
          type="text"
          name="title"
          placeholder="Nombre del producto*"
          value={usedForm.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={usedForm.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio*"
          value={usedForm.price}
          onChange={handleChange}
          required
          min={0}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría*"
          value={usedForm.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="URL de imagen"
          value={usedForm.thumbnail}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
        {mensaje && <div style={{ marginTop: 10, color: "#0071e3" }}>{mensaje}</div>}
      </form>
    </section>
  );
}