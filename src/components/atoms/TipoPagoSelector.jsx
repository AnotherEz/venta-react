// src/components/MetodoPago/TipoPagoSelector.jsx
import React from "react";

export default function TipoPagoSelector({
  tipoPago,
  disabled,
  onChangeTipoPago,
}) {
  return (
    <div className="grupo">
      <label>Tipo de Pago</label>
      <select value={tipoPago} onChange={onChangeTipoPago} disabled={disabled}>
        <option>Efectivo</option>
        <option>Tarjeta/POS</option>
        <option>Mixto</option>
      </select>
    </div>
  );
}
