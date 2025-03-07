import React from "react";
import "./../assets/busqproduct.css"; // Estilos para este componente

export default function BusquedaProductoUI() {
  return (
    <div className="busqueda-container">
      <h2 className="titulo">Producto</h2>
      <input
        type="text"
        placeholder="🔍 Escriba el código, nombre o palabra clave..."
        className="input-busqueda"
      />

      {/* Sección de detalles del producto */}
      <div className="detalle-producto">
        <div className="campo">
          <label className="campo-label">Cantidad</label>
          <input type="number" min="1" defaultValue="1" className="cantidad-input" />
        </div>

        <div className="campo">
          <label className="campo-label">Categoría</label>
          <span className="info-texto">Electrónica</span>
        </div>

        <div className="campo">
          <label className="campo-label">Precio Unitario</label>
          <span className="info-texto">S/ 9.00</span>
        </div>

        <div className="campo">
          <label className="campo-label">Precio Mayorista</label>
          <span className="info-texto">S/ 8.00</span>
        </div>

        <div className="campo">
          <label className="campo-label">Stock Disponible</label>
          <span className="info-texto">15</span>
        </div>
      </div>

      {/* Sección de botones y descripción */}
      <div className="extra-container">
        <div className="botones">
          <button className="btn agregar">Agregar producto al carrito</button>
          <button className="btn eliminar">Eliminar producto</button>
        </div>

        <div className="descripcion">
          <label className="campo-label">Descripción del producto:</label>
          <p className="descripcion-texto">Producto de alta calidad con garantía.</p>
        </div>
      </div>
    </div>
  );
}
