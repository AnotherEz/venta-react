// src/components/atoms/DetalleProductoSeleccionadoCompra.jsx
import React from "react";

export default function DetalleProductoSeleccionadoCompra({
  producto,
  cantidadLotes,
  setCantidadLotes,
  precioPorLote,
  setPrecioPorLote,
  cantidadPorLote,
  setCantidadPorLote,
  onAgregar,
  onEliminar,
}) {
  if (!producto) return null; // No muestra nada si no hay producto seleccionado

  return (
    <div className="detalle-producto">
      <div className="producto-info">
        <div className="campo">
          <label className="campo-label">Cantidad de Lotes</label>
          <input
            type="number"
            min="1"
            value={cantidadLotes}
            onChange={(e) => setCantidadLotes(parseInt(e.target.value, 10))}
            className="cantidad-input"
          />
        </div>

        <div className="campo">
          <label className="campo-label">Precio por Lote</label>
          <input
            type="number"
            step="any"
            min="0"
            value={precioPorLote}
            onChange={(e) => setPrecioPorLote(parseFloat(e.target.value) || 0)}
            className="precio-input"
          />
        </div>

        <div className="campo">
          <label className="campo-label">Cantidad por Lote</label>
          <input
            type="number"
            min="1"
            value={cantidadPorLote}
            onChange={(e) => setCantidadPorLote(parseInt(e.target.value, 10))}
            className="cantidad-input"
          />
        </div>

        <div className="campo">
          <label className="campo-label">Stock Disponible</label>
          <span className="info-texto">{producto.stock_disponible}</span>
        </div>
      </div>

      <div className="botones-agregar" style={{ marginTop: "1rem" }}>
        <button className="btn-agregar" onClick={onAgregar}>
          Agregar productos al carrito
        </button>
        <button className="btn-eliminar" onClick={onEliminar}>
          Eliminar productos del carrito
        </button>
      </div>
    </div>
  );
}
