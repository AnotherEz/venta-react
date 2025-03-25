// src/components/BusquedaProducto/BarraBusqueda.jsx
import React from "react";

export default function BarraBusqueda({
  query,
  onChangeQuery,
  onBuscarEnAPI,
  mostrarBotonBuscar,
}) {
  return (
    <div className="busqueda-barra">
      <input
        id="input-busqueda"
        type="text"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder="🔍 Escriba el código, nombre o palabra clave..."
        className="input-busqueda"
      />
      <button
        onClick={onBuscarEnAPI}
        disabled={!mostrarBotonBuscar}
        className={`btn-buscar ${mostrarBotonBuscar ? "activo" : "icono"}`}
      >
        🔍
      </button>
    </div>
  );
}
