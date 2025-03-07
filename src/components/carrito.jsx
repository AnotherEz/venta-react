import React from "react";
import BusquedaProductoUI from "./busquedaproducto";
import ListaCarritoUI from "./listacarrito";
import "./../assets/carrito.css"; // Estilos específicos para este componente

export default function CarritoUI() {
  return (
    <div className="carrito-container">
      {/* Sección de búsqueda y detalle del producto */}
      <BusquedaProductoUI />

      {/* Sección del carrito */}
      <ListaCarritoUI />
    </div>
  );
}
