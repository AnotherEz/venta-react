// src/components/BusquedaProducto/SugerenciasProducto.jsx
import React from "react";

export default function SugerenciasProducto({
  filtroProductos,
  onSeleccionarProducto,
}) {
  if (!filtroProductos || filtroProductos.length === 0) return null;

  return (
    <ul className="lista-sugerencias">
      {filtroProductos.map((producto) => (
        <li
          key={producto.codigo}
          onClick={() => onSeleccionarProducto(producto)}
        >
          {producto.nombre_producto} - {producto.codigo} (Stock:{" "}
          {producto.stock_disponible})
        </li>
      ))}
    </ul>
  );
}
