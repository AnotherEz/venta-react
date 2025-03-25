// src/pages/Compras.jsx
import React, { useState } from "react";

// Vistas
import BusquedaProductoCompraUI from "../components/molecules/BusquedaProductoCompraUI";
import ListaCarritoCompraUI from "../components/molecules/ListaCarritoCompraUI";
import BotonFinalizarCompra from "../components/atoms/BotonFinalizarCompra";
import ComprobanteCompra from "../components/ComprobantePago2"; // Ajusta tu ruta


export default function Compras() {
  // Carrito y productos
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  // Total y estado final
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [compraFinalizada, setCompraFinalizada] = useState(null);

  // Ejemplo: definimos un “montoValido” => lo setearías según tu lógica
  const montoValido = true; // Podrías poner una condición real si gustas

  // Al finalizar la compra
  const handleFinalizarCompra = () => {
    const compra = {
      total: totalCarrito,
      productos: carrito,
      fecha: new Date().toISOString(),
    };
    console.log("Compra final =>", compra);
    // Guardar en BD si gustas
    setCompraFinalizada(compra);
  };

  return (
    <div>

      {/* Búsqueda de productos */}
      <BusquedaProductoCompraUI
        carrito={carrito}
        setCarrito={setCarrito}
        productos={productos}
        setProductos={setProductos}
      />

      {/* Tabla carrito */}
      <ListaCarritoCompraUI
        carrito={carrito}
        setCarrito={setCarrito}
        setTotalCarrito={setTotalCarrito}
        productos={productos}
        setProductos={setProductos}
      />

      {/* Botón “Finalizar Compra” usando BotonFinalizarCompra */}
      <BotonFinalizarCompra
        totalCarrito={totalCarrito}
        montoValido={montoValido}
        onFinalizar={handleFinalizarCompra}
      />

      {/* Comprobante si la compra fue finalizada */}
      {compraFinalizada && (
        <div className="compras-modal-overlay">
          <ComprobanteCompra
            compra={compraFinalizada}
            productos={compraFinalizada.productos}
            onClose={() => setCompraFinalizada(null)}
          />
        </div>
      )}
    </div>
  );
}
