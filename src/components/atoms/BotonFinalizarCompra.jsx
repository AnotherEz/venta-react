// src/components/atoms/BotonFinalizarCompra.jsx
import React from "react";

export default function BotonFinalizarCompra({ totalCarrito, montoValido, onFinalizar }) {
  // Muestra el botón solo si hay un total > 0 y un “montoValido” (lógica a tu elección).
  if (totalCarrito > 0 && montoValido) {
    return (
      <div className="finalizar-container-compra">
        <button className="btn-finalizar-compra" onClick={onFinalizar}>
          Finalizar Compra
        </button>
      </div>
    );
  }
  // Si no cumple, no renderiza nada.
  return null;
}
