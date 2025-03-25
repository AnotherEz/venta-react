// src/components/MetodoPago/TipoVentaSelector.jsx
import React from "react";

export default function TipoVentaSelector({ tipoVenta, onChangeTipoVenta }) {
  return (
    <div className="grupo">
      <label>Tipo de Venta</label>
      <select value={tipoVenta} onChange={onChangeTipoVenta}>
        <option>Venta rápida</option>
        <option>Venta con Boleta</option>
        <option>Venta con Factura</option>
      </select>
    </div>
  );
}
