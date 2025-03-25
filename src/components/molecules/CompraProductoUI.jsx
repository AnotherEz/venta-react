import React from "react";
import "./CompraProductoUI.css";

export default function CompraProductoUI({
  // Props que puedas necesitar
  productoSeleccionado,
  cantidadLotes,
  setCantidadLotes,
  precioPorLote,
  setPrecioPorLote,
  stockDisponible,
  totalAbastecer,
  descripcionProducto,
  proveedor,
  // etc...
  onBuscarProducto,
  onAbrirEdicionProducto, // Para abrir el componente de edición
  onAgregarCarrito,
  onEliminarCarrito,
  onRegistrarCompra
}) {
  return (
    <div className="compra-producto-container">
      <h2>Producto</h2>

      {/* Barra de búsqueda */}
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="🔍 Busca producto"
          onChange={onBuscarProducto}
          // value={busqueda} etc...
        />
        {/* Botón que abre el componente de edición */}
        <button className="btn-editar-producto" onClick={onAbrirEdicionProducto}>
          +
        </button>
      </div>

      {/* Sección detalles del producto */}
      <div className="detalle-producto">
        {/* Columna 1: Campos que se editan */}
        <div className="detalle-columna">
          <label>Cantidad de Lotes</label>
          <input
            type="number"
            value={cantidadLotes}
            onChange={(e) => setCantidadLotes(e.target.value)}
          />

          <label>Precio por Lote</label>
          <input
            type="number"
            value={precioPorLote}
            onChange={(e) => setPrecioPorLote(e.target.value)}
          />

          <label>Cantidad total abastecer</label>
          <span>{totalAbastecer}</span> {/* o un input si hace falta */}
        </div>

        {/* Columna 2: Info extra */}
        <div className="detalle-columna">
          <label>Stock disponible</label>
          <span>{stockDisponible}</span>

          <label>Proveedor</label>
          <span>{proveedor || "—"}</span>

          <label>Descripción del producto</label>
          <p>{descripcionProducto}</p>
        </div>
      </div>

      {/* Botones de acción (Agregar/Eliminar) */}
      <div className="botones-carrito">
        <button
          className="btn-agregar"
          onClick={onAgregarCarrito}
          disabled={!productoSeleccionado}
        >
          Agregar productos al carrito
        </button>
        <button
          className="btn-eliminar"
          onClick={onEliminarCarrito}
          disabled={!productoSeleccionado}
        >
          Eliminar productos del carrito
        </button>
      </div>

      {/* Botón final: Registrar compra */}
      <div className="registrar-compra">
        <button onClick={onRegistrarCompra}>Registrar compra</button>
      </div>
    </div>
  );
}
