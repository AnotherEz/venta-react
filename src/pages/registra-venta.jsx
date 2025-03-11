import React, { useState } from "react";
import MetodoPago from "./../components/metodoPago";
import CarritoUI from "./../components/carrito";
import Boleta from "./../components/comprobante"; // 🔹 Asegúrate de que la ruta es correcta

export default function Ventas() {
  const [clienteId, setClienteId] = useState(null);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [ventaFinalizada, setVentaFinalizada] = useState(null);
  const [carrito, setCarrito] = useState([]); // ✅ Agregar el estado del carrito

  const handleFinalizarVenta = (venta) => {
    setVentaFinalizada({ ...venta, productos: carrito }); // ✅ Incluir productos del carrito
  };

  return (
    <div>
      {/* 🔹 Primero el método de pago */}
      <MetodoPago 
        setClienteId={setClienteId} 
        totalCarrito={totalCarrito} 
        carrito={carrito} // ✅ Pasamos el carrito
        onFinalizarVenta={handleFinalizarVenta} 
      />

      {/* 🔹 Luego el carrito con productos */}
      <CarritoUI 
        clienteId={clienteId} 
        setTotalCarrito={setTotalCarrito} 
        carrito={carrito} 
        setCarrito={setCarrito} // ✅ Pasamos el estado del carrito
      />

      {/* ✅ Mostrar Boleta en modal si la venta fue finalizada */}
      {ventaFinalizada && (
        <div className="modal-overlay">
          <Boleta 
            venta={ventaFinalizada} 
            productos={ventaFinalizada.productos} // ✅ Enviamos los productos
            onClose={() => setVentaFinalizada(null)} 
          />
        </div>
      )}
    </div>
  );
}
