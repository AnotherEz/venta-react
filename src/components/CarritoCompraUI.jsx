import React from "react";
import BusquedaProductoCompraUI from "./molecules/BusquedaProductoCompraUI";
import ListaCarritoCompraUI from "./molecules/ListaCarritoCompraUI"; // ✅ Usa la tabla adaptada
import "./../assets/carrito.css"; // ✅ Estilo separado

export default function CarritoAbastecimientoUI({
  proveedorId,
  setTotalCarrito,
  carrito,
  setCarrito,
  productos,
  setProductos,
}) {
  return (
    <div className="carrito-container">
      {/* 🔹 Búsqueda de productos para abastecimiento */}
      <BusquedaProductoCompraUI
        clienteId={proveedorId} // en compras puede llamarse proveedorId
        carrito={carrito}
        setCarrito={setCarrito}
        productos={productos}
        setProductos={setProductos}
      />

      {/* 🔹 Lista del carrito estilo compras */}
      <ListaCarritoCompraUI
        carrito={carrito}
        setCarrito={setCarrito}
        setTotalCarrito={setTotalCarrito}
        productos={productos}
        setProductos={setProductos}
      />
    </div>
  );
}
