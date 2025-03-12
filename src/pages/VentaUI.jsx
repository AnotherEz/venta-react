import React, { useState } from "react";
import MetodoPago from "../components/MetodoPagoUI";
import CarritoUI from "../components/CarritoUI";
import Boleta from "../components/VoucherUI"; // 🔹 Asegúrate de que la ruta es correcta

export default function Ventas() {
  const [clienteId, setClienteId] = useState(null);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [ventaFinalizada, setVentaFinalizada] = useState(null);
  const [carrito, setCarrito] = useState([]); // ✅ Estado del carrito
  const [productos, setProductos] = useState([]); // ✅ Estado de productos para stock

  const handleFinalizarVenta = (venta) => {
    setVentaFinalizada({ ...venta, productos: carrito }); // ✅ Incluir productos en la boleta
  };

  return (
    <div>
      {/* 🔹 Primero el método de pago */}
      <MetodoPago 
        setClienteId={setClienteId} 
        totalCarrito={totalCarrito} 
        carrito={carrito} 
        setCarrito={setCarrito}  // ✅ Pasamos setCarrito para vaciarlo luego
        productos={productos}    // ✅ Pasamos productos para actualizar stock
        setProductos={setProductos} // ✅ Pasamos setProductos para modificar el stock
        onFinalizarVenta={handleFinalizarVenta} 
      />

      {/* 🔹 Luego el carrito con productos */}
      <CarritoUI 
        clienteId={clienteId} 
        setTotalCarrito={setTotalCarrito} 
        carrito={carrito} 
        setCarrito={setCarrito} 
        productos={productos}    // ✅ Pasamos productos
        setProductos={setProductos} // ✅ Pasamos setProductos
      />

      {/* ✅ Mostrar Boleta en modal si la venta fue finalizada */}
      {ventaFinalizada && (
        <div className="modal-overlay">
          <Boleta 
            venta={ventaFinalizada} 
            productos={ventaFinalizada.productos} 
            onClose={() => setVentaFinalizada(null)} 
          />
        </div>
      )}
    </div>
  );
}
