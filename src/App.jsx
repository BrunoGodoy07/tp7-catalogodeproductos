import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import AgregarProducto from "./pages/AgregarProducto";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/categoria/:idCategoria" element={<Productos />} />
          <Route path="/productos/:idProducto" element={<ProductoDetalle />} />
          <Route path="/agregar-producto" element={<AgregarProducto onProductoAgregado={() => {}} />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}