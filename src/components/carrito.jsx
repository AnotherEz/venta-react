import React, { useState } from "react";
import BusquedaProductoUI from "./../components/busquedaproducto";
import ListaCarritoUI from "./../components/listacarrito";
import "./../assets/carrito.css";

export default function CarritoUI({ clienteId }) {
  const [reloadCarrito, setReloadCarrito] = useState(false);

  // 🔄 Función para forzar la actualización del carrito
  const actualizarCarrito = () => {
    setReloadCarrito((prev) => !prev);
  };

  return (
    <div className="carrito-container">
      <BusquedaProductoUI clienteId={clienteId} actualizarCarrito={actualizarCarrito} />
      <ListaCarritoUI clienteId={clienteId} reloadCarrito={reloadCarrito} />
    </div>
  );
}
