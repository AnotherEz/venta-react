import React from "react";
import "./../assets/boleta.css";

export default function Boleta({ datos }) {
  return (
    <div className="boleta-container">
      {/* Encabezado */}
      <div className="boleta-header">
        <h3>{datos.empresa.nombre}</h3>
        <p>RUC: {datos.empresa.ruc}</p>
        <p>{datos.empresa.direccion}</p>
        <p>{datos.empresa.ciudad}</p>
        <h4>{datos.tipoDocumento} - {datos.fecha} {datos.hora}</h4>
      </div>

      {/* Lista de productos */}
      <div className="boleta-productos">
        {datos.productos.map((producto, index) => (
          <div key={index} className="producto">
            <p>{producto.descripcion}</p>
            <p>S/ {producto.precio.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="boleta-totales">
        <p>SUBTOTAL: <span>S/ {datos.subtotal.toFixed(2)}</span></p>
        <p>DESCUENTOS: <span>- S/ {datos.descuento.toFixed(2)}</span></p>
        <p className="importe-total">TOTAL: <span>S/ {datos.total.toFixed(2)}</span></p>
      </div>

      {/* Cliente (Opcional) */}
      <div className="boleta-cliente">
        <p>Cajero: {datos.cajero}</p>
        {datos.dni && <p>DNI Cliente: {datos.dni}</p>}
        {datos.ruc && <p>RUC Cliente: {datos.ruc}</p>}
      </div>

      {/* Código QR */}
      <div className="boleta-qr">
        <img src={datos.qrUrl} alt="QR" />
        <p>Validar en: www.tienda-abarrote.pe</p>
      </div>

      {/* Mensaje final */}
      <p className="mensaje-final">¡GRACIAS POR SU COMPRA!</p>
    </div>
  );
}
