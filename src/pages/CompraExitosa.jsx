import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CompraExitosa() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h2>¡Compra realizada con éxito!</h2>
      <p>Serás redirigido a la página principal en unos segundos...</p>
    </div>
  );
}