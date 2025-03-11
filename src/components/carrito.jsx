import React, { useState } from "react";
import BusquedaProductoUI from "./../components/busquedaproducto";
import ListaCarritoUI from "./../components/listacarrito";
import "./../assets/carrito.css";

export default function CarritoUI({ clienteId, setTotalCarrito, carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);

  return (
    <div className="carrito-container">
      {/* 🔹 Primero la búsqueda */}
      <BusquedaProductoUI
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
      />
    </div>
  );
}
