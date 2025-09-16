import PropTypes from "prop-types";

export default function Footer({ companyName = "Catálogo de Productos", additionalText }) {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} {companyName}</p>
      {additionalText && <p>{additionalText}</p>}
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  additionalText: PropTypes.string,
};

Footer.defaultProps = {
  companyName: "Catálogo de Productos",
  additionalText: null,
};