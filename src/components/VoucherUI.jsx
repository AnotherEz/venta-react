import React, { useEffect } from "react";
import "./../assets/boleta.css";

export default function Boleta({ venta, onClose }) {
  // 📌 Manejar teclas: `ESC` para cerrar y `Enter` para imprimir
  useEffect(() => {
    const handleKeyDown = (event) => { 
      if (event.key === "Escape") {
        onClose(); // Cierra la boleta con ESC
      }

      // 📌 Bloquear el desplazamiento con la tecla espacio
      if (event.key === " ") {
        event.preventDefault(); // Previene el scroll hacia abajo
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 📌 Validar si `venta` existe
  if (!venta) {
    return null;
  }

  // 📌 Validar si `productos` existe y tiene datos
  const productosLista = venta.productos && venta.productos.length > 0 ? venta.productos : [];

  console.log("📜 Datos de la boleta:", venta);

  return (
    <div className="boleta-modal">
      <div className="boleta-container">
        {/* Encabezado */}
        <div className="boleta-header">
          <h3>Tienda Abarrotes S.A.C.</h3>
          <p>RUC: 2028392963</p>
          <p>Av. Sánchez Cerro 4129, Piura - Castilla</p>
          <h4>{venta.tipoVenta} - {new Date().toLocaleString()}</h4>
        </div>

        {/* Lista de productos */}
        <div className="boleta-productos">
          <div className="productos-scroll">
            {productosLista.length > 0 ? (
              productosLista.map((producto, index) => (
                <div key={index} className="producto">
                  <p><strong>{producto.nombre}</strong></p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p>Subtotal: S/ {producto.subtotal.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p>⚠️ No hay productos en esta venta.</p>
            )}
          </div>
        </div>

        {/* Totales */}
        <div className="boleta-totales">
          <p>SUBTOTAL: <span>S/ {venta.total.toFixed(2)}</span></p>
          <p>VUELTO: <span>S/ {venta.vuelto.toFixed(2)}</span></p>
        </div>

        {/* Cliente */}
        <div className="boleta-cliente">
          <p><strong>Cajero:</strong> {venta.cajero || "Eduardo Fernandez"}</p>
          {venta.nombreCliente && <p><strong>Cliente:</strong> {venta.nombreCliente}</p>}
          {venta.dniRuc && <p><strong>DNI/RUC Cliente:</strong> {venta.dniRuc}</p>}
        </div>

        {/* Código QR actualizado */}
        <div className="boleta-qr">
          <img 
            src={venta.qrUrl || "https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"} 
            alt="QR" 
            width="100"
          />
          <p>Validar en: www.tienda-abarrote.pe</p>
        </div>

        {/* Botones */}
        <div className="boleta-botones">
          <button onClick={() => window.print()}>Imprimir</button>
          <button onClick={onClose}>Cancelar</button> {/* Renombrado de "Cerrar" a "Cancelar" */}
        </div>
      </div>
    </div>
  );
}
