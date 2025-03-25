// src/components/ComprobanteCompra.jsx
import React, { useEffect } from "react";
import "./../assets/boleta.css";

export default function ComprobanteCompra({ compra, onClose }) {
  // Manejar teclas: ESC para cerrar, etc.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Cierra el comprobante con ESC
      }
      // Prevenir scroll al presionar espacio
      if (event.key === " ") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Si no hay compra, no renderizamos nada
  if (!compra) return null;

  // Lista de productos
  const listaProductos = compra.productos && compra.productos.length > 0
    ? compra.productos
    : [];

  console.log("ComprobanteCompra => datos de la compra:", compra);

  return (
    <div className="comprobante-compra-overlay">
      <div className="comprobante-compra-container">
        {/* Encabezado */}
        <div className="comprobante-compra-header">
          <h3>Tienda Abarrotes S.A.C.</h3>
          <p>RUC: 2028392963</p>
          <p>Av. Sánchez Cerro 4129, Piura - Castilla</p>
          <h4>Comprobante de Compra — {new Date().toLocaleString()}</h4>
        </div>

        {/* Lista de productos */}
        <div className="comprobante-compra-productos">
          <div className="comprobante-compra-scroll">
            {listaProductos.length > 0 ? (
              listaProductos.map((p, index) => {
                const unidades = (p.cantidadLotes || 0) * (p.cantidadPorLote || 0);
                return (
                  <div key={index} className="comprobante-compra-item">
                    <p><strong>{p.nombre}</strong></p>
                    <p>Lotes: {p.cantidadLotes} — C/U: S/ {p.precioPorLote.toFixed(2)}</p>
                    <p>Cant. total: {unidades} u</p>
                    <p>Subtotal: <strong>S/ {p.subtotal.toFixed(2)}</strong></p>
                  </div>
                );
              })
            ) : (
              <p>⚠️ No hay productos en esta compra.</p>
            )}
          </div>
        </div>

        {/* Totales */}
        <div className="comprobante-compra-totales">
          <p>MONTO TOTAL: <span>S/ {compra.total.toFixed(2)}</span></p>
        </div>

        {/* Datos del proveedor (opcional) */}
        <div className="comprobante-compra-proveedor">
          <p><strong>Usuario/Cajero:</strong> {compra.usuario || "No especificado"}</p>
          {compra.proveedor && (
            <p><strong>Proveedor:</strong> {compra.proveedor}</p>
          )}
          {compra.rucProveedor && (
            <p><strong>RUC Proveedor:</strong> {compra.rucProveedor}</p>
          )}
        </div>

        {/* QR (opcional) */}
        <div className="comprobante-compra-qr">
          <img
            src={compra.qrUrl || "https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"}
            alt="QR"
            width="100"
          />
          <p>Validar en: www.tienda-abarrotes.pe</p>
        </div>

        {/* Botones */}
        <div className="comprobante-compra-botones">
          <button onClick={() => window.print()}>Imprimir</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
