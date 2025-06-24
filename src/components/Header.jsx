import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <h1>Catálogo de Productos</h1>
    </header>
  );
}