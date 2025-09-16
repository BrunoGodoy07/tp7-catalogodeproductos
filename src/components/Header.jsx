import PropTypes from "prop-types";
import logo from "../assets/logo.png";

export default function Header({ 
  title = "Catálogo de Productos", 
  logoAlt = "Logo de la empresa",
  logoPath = logo 
}) {
  return (
    <header>
      <img src={logoPath} alt={logoAlt} />
      <h1>{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  logoAlt: PropTypes.string,
  logoPath: PropTypes.string,
};

Header.defaultProps = {
  title: "Catálogo de Productos",
  logoAlt: "Logo de la empresa",
  logoPath: logo,
};