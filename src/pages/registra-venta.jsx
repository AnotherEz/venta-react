import React, { useState } from "react";
import { realizarVenta } from "./../services/ventaService"; // Importar servicio de ventas

export default function SalesSystem({ userId }) {
  const [tipoVenta, setTipoVenta] = useState("Venta rápida");
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [productos, setProductos] = useState([]); // Los productos que se venderán

  const handleVenta = async () => {
    try {
      const result = await realizarVenta(userId, tipoVenta, montoEfectivo, productos);
      alert("Venta realizada exitosamente");
    } catch (error) {
      alert("Error al realizar la venta");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Método de Pago */}
      <div className="card">
        <h3>Método de pago</h3>
        <label>Tipo de Venta</label>
        <select onChange={(e) => setTipoVenta(e.target.value)}>
          <option>Venta rápida</option>
          <option>Venta detallada</option>
        </select>
        <label>DNI / RUC</label>
        <input placeholder="Ingresa DNI / RUC" />
        <label>Monto Efectivo</label>
        <input
          type="number"
          placeholder="S/"
          value={montoEfectivo}
          onChange={(e) => setMontoEfectivo(e.target.value)}
        />
      </div>

      <div className="botones">
        <button onClick={handleVenta}>Finalizar Venta</button>
      </div>
    </div>
  );
}
