// src/components/MetodoPago/DniRucInput.jsx
import React from "react";

export default function DniRucInput({
  dniRuc,
  nombreCliente,
  disabled,
  maxLength,
  isBoleta,
  isFactura,
  onChangeDniRuc,
}) {
  return (
    <div className="grupo">
      <label>DNI / RUC</label>
      <input
        type="text"
        value={dniRuc}
        onChange={onChangeDniRuc}
        disabled={disabled}
        placeholder={
          isBoleta
            ? "Ingresa DNI (8 dígitos)"
            : isFactura
            ? "Ingresa RUC (11 dígitos)"
            : "Ingresa DNI/RUC"
        }
        maxLength={maxLength}
      />
      <p className="subtexto">
        {nombreCliente
          ? `Nombre/Razón social: ${nombreCliente}`
          : "Nombre/Razón social"}
      </p>
    </div>
  );
}
