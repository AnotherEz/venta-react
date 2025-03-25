// src/components/BusquedaProducto/DetalleProductoSeleccionado.jsx
import React from "react";

export default function DetalleProductoSeleccionadoVenta({
  producto,
  cantidad,
  setCantidad,
  onAgregar,
  onEliminar,
  clienteId,
}) {
  if (!producto) return null;

  return (
    <div className="detalle-producto">
      <div className="producto-info">
        <div className="campo">
          <label className="campo-label">Cantidad</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            className="cantidad-input"
          />
        </div>

        <div className="campo">
          <label className="campo-label">Categoría</label>
          <span className="info-texto">{producto.categoria}</span>
        </div>

        <div className="campo">
          <label className="campo-label">Precio Unitario</label>
          <span className="info-texto">
            S/ {parseFloat(producto.precio_unitario).toFixed(2)}
          </span>
        </div>

        <div className="campo">
          <label className="campo-label">Precio Mayorista</label>
          <span className="info-texto">
            S/ {parseFloat(producto.precio_mayorista).toFixed(2)}
          </span>
        </div>

        <div className="campo">
          <label className="campo-label">Stock Disponible</label>
          <span className="info-texto">{producto.stock_disponible}</span>
        </div>
      </div>

      <div className="descripcion">
        <label className="campo-label">Descripción del producto:</label>
        <p className="descripcion-texto">{producto.descripcion}</p>
      </div>
      <div className="botones-agregar">
        <button
          className="btn-agregar"
          onClick={onAgregar}
          disabled={!producto || !clienteId}
        >
          Agregar producto al carrito
        </button>
        <button
          className="btn-eliminar"
          onClick={onEliminar}
          disabled={!producto || !clienteId}
        >
          Eliminar producto
        </button>
      </div>
    </div>
  );
}
