// src/components/BusquedaProducto.jsx
import React from "react";
import "./../../assets/busqproduct.css"; // Ajusta ruta según tu estructura

import { useBusquedaProducto } from "../../hooks/useBusquedaProducto";

// Subcomponentes
import BarraBusqueda from "../atoms/BarraBusqueda";
import SugerenciasProducto from "../atoms/SugerenciasProducto";
import DetalleProductoSeleccionadoVenta from "../atoms/DetalleProductoSeleccionadoVenta";

export default function BusquedaProductoVentaUI({ clienteId, carrito, setCarrito, setProductos }) {
  const {
    // Estados
    filtroProductos,
    productoSeleccionado,
    query,
    loading,
    mostrarBotonBuscar,
    cantidad,

    // Métodos
    handleInputChange,
    handleBuscarEnAPI,
    handleSeleccionarProducto,
    handleAgregarAlCarrito,
    handleEliminarDelCarrito,
    limpiarSeleccion,
    setCantidad,
  } = useBusquedaProducto({ 
    carrito, 
    setCarrito, 
    clienteId,
    setProductos
  });

  return (
    <div className="busqueda-container">
      <h2 className="titulo">Producto</h2>

      {/* Barra de búsqueda */}
      <BarraBusqueda
        query={query}
        onChangeQuery={handleInputChange}
        onBuscarEnAPI={handleBuscarEnAPI}
        mostrarBotonBuscar={mostrarBotonBuscar}
      />

      {/* Lista de sugerencias */}
      <SugerenciasProducto
        filtroProductos={filtroProductos}
        onSeleccionarProducto={handleSeleccionarProducto}
      />

      {/* Detalle del producto seleccionado */}
      <DetalleProductoSeleccionadoVenta
      
        producto={productoSeleccionado}
        cantidad={cantidad}
        setCantidad={setCantidad}
        onAgregar={handleAgregarAlCarrito}
        onEliminar={handleEliminarDelCarrito}
        clienteId={clienteId}
      />

      {/* Botón o link para limpiar selección si gustas */}
      {productoSeleccionado && (
        <button onClick={limpiarSeleccion}>Limpiar selección</button>
      )}

      {loading && <p>Cargando productos...</p>}
    </div>
  );
}
