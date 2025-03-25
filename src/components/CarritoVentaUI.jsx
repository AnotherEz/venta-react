import React from "react";
import BusquedaProductoVentaUI from "./molecules/BusquedaProductoVentaUI";
import ListaCarritoUI from "./../components/molecules/ListaCarritoVentasUI";
import "./../assets/carrito.css";

export default function CarritoVentaUI({ clienteId, setTotalCarrito, carrito, setCarrito, productos, setProductos }) {
  return (
    <div className="carrito-container">
      {/* 🔹 Primero la búsqueda */}
      <BusquedaProductoVentaUI
        clienteId={clienteId}
        carrito={carrito}
        setCarrito={setCarrito}
        productos={productos}
        setProductos={setProductos}
      />

      {/* 🔹 Luego la lista del carrito */}
      <ListaCarritoUI 
        carrito={carrito} 
        setCarrito={setCarrito} 
        setTotalCarrito={setTotalCarrito} 
        productos={productos}   // ✅ Pasamos productos
        setProductos={setProductos} // ✅ Pasamos setProductos
      />
    </div>
  );
}
