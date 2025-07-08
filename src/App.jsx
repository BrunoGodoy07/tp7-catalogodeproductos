import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import CompraExitosa from "./pages/CompraExitosa";
import { CartProvider } from "./context/CardContext.jsx";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/categoria/:idCategoria" element={<Productos />} />
            <Route path="/productos/:idProducto" element={<ProductoDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}