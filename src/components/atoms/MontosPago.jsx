// src/components/MetodoPago/MontosPago.jsx
import React from "react";

export default function MontosPago({
  montoEfectivo,
  montoTarjeta,
  vuelto,
  montoEfectivoDisabled,
  montoTarjetaDisabled,
  onChangeMontoEfectivo,
  onChangeMontoTarjeta,
}) {
  return (
    <>
      <div className="grupo">
        <label>Monto en efectivo</label>
        <input
          type="text"          // Permite escribir decimales libremente
          inputMode="decimal"  // Sugerencia de teclado numérico en móviles
          placeholder="0.00"   // Opcional: guía al usuario
          value={montoEfectivo ?? ""} // Asegura que nunca sea undefined
          onChange={(e) => onChangeMontoEfectivo(e.target.value)}
          disabled={montoEfectivoDisabled}
        />
      </div>

      <div className="grupo">
        <label>Monto en Tarjeta/POS</label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={montoTarjeta ?? ""}
          onChange={(e) => onChangeMontoTarjeta(e.target.value)}
          disabled={montoTarjetaDisabled}
        />
      </div>

      <div className="vuelto-container">
        <p>Vuelto a dar</p>
        <p className="vuelto-monto">S/ {vuelto.toFixed(2)}</p>
      </div>
    </>
  );
}
