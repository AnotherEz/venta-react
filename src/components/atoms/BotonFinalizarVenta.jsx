// src/components/MetodoPago/BotonFinalizarVenta.jsx
import React from "react";

export default function BotonFinalizarVenta({ totalCarrito, montoSuficiente, onFinalizar }) {
  if (totalCarrito > 0 && montoSuficiente) {
    return (
      <div className="finalizar-container">
        <button className="btn-finalizar" onClick={onFinalizar}>
          Finalizar Venta
        </button>
      </div>
    );
  }
  return null; // No renderiza nada si no cumple las condiciones
}


