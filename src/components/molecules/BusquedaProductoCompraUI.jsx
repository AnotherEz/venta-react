// src/components/molecules/BusquedaProductoCompraUI.jsx
import React from "react";
import { useBusquedaProductoCompra } from "./../../hooks/useBusquedaProductoCompras";

// Subcomponentes
import BarraBusqueda from "./../atoms/BarraBusqueda";
import SugerenciasProducto from "./../atoms/SugerenciasProducto";
import DetalleProductoSeleccionadoCompra from "./../atoms/DetalleProductoSeleccionadoCompra";

// CSS
import "./../../assets/compras.css";

export default function BusquedaProductoCompraUI({
  carrito,
  setCarrito,
  productos,
  setProductos,
}) {
  const {
    filtroProductos,
    productoSeleccionado,
    query,
    loading,
    mostrarBotonBuscar,

    cantidadLotes,
    setCantidadLotes,
    precioPorLote,
    setPrecioPorLote,
    cantidadPorLote,
    setCantidadPorLote,

    handleInputChange,
    handleBuscarEnAPI,
    handleSeleccionarProducto,
    handleAgregarAlCarrito,
    handleEliminarDelCarrito,
    limpiarSeleccion,
  } = useBusquedaProductoCompra({
    carrito,
    setCarrito,
    setProductos,
  });

  return (
    <div className="compras-container">
      <h2>Producto</h2>

      <BarraBusqueda
        query={query}
        onChangeQuery={handleInputChange}
        onBuscarEnAPI={handleBuscarEnAPI}
        mostrarBotonBuscar={mostrarBotonBuscar}
      />

      <SugerenciasProducto
        filtroProductos={filtroProductos}
        onSeleccionarProducto={handleSeleccionarProducto}
      />

      <DetalleProductoSeleccionadoCompra
        producto={productoSeleccionado}
        cantidadLotes={cantidadLotes}
        setCantidadLotes={setCantidadLotes}
        precioPorLote={precioPorLote}
        setPrecioPorLote={setPrecioPorLote}
        cantidadPorLote={cantidadPorLote}
        setCantidadPorLote={setCantidadPorLote}
        onAgregar={handleAgregarAlCarrito}
        onEliminar={handleEliminarDelCarrito}
      />

      {productoSeleccionado && (
        <button className="compras-btn-limpiar" onClick={limpiarSeleccion}>
          Limpiar selección
        </button>
      )}

      {loading && <p>Cargando productos...</p>}
    </div>
  );
}
