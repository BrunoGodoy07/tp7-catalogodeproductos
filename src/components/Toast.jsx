import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Toast({ message, onClose, duration = 2000 }) {
  useEffect(() => {
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        background: "#0071e3",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: 8,
        fontSize: 16,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

Toast.defaultProps = {
  duration: 2000,
};