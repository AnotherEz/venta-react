import React, { useState, useEffect } from "react";
import { obtenerProductos, buscarProductos } from "./../services/productoService";
import { agregarProductoAlCarrito, eliminarProductoDelCarrito } from "./../services/carritoService";
import "./../assets/busqproduct.css";

export default function BusquedaProductoUI({ clienteId, actualizarCarrito }) {
  const [productos, setProductos] = useState([]);
  const [filtroProductos, setFiltroProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarBotonBuscar, setMostrarBotonBuscar] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  // 🔹 Cargar todos los productos al inicio
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const productosAPI = await obtenerProductos();
        setProductos(productosAPI);
      } catch (error) {
        console.error("⚠️ Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  // 🔹 Manejo de eventos del teclado (tecla "+")
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "+" && productoSeleccionado && clienteId) {
        e.preventDefault();
        handleAgregarAlCarrito();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [productoSeleccionado, cantidad, clienteId]);

  // 🔹 Filtrar productos en tiempo real
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltroProductos([]);
      setMostrarBotonBuscar(false);
      return;
    }

    const resultados = productos.filter((prod) =>
      prod.nombre_producto.toLowerCase().includes(value.toLowerCase()) ||
      prod.codigo.toLowerCase().includes(value.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(value.toLowerCase())
    );

    setFiltroProductos(resultados);
    setMostrarBotonBuscar(resultados.length === 0);
  };

  // 🔹 Buscar en API si no hay coincidencias en frontend
  const handleBuscarEnAPI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await buscarProductos({ nombre: query, codigo: query, categoria: query });
      setFiltroProductos(result.length > 0 ? result : []);
      setMostrarBotonBuscar(result.length === 0);
    } catch (error) {
      alert("⚠️ Error al buscar producto.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Seleccionar un producto
  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setQuery(producto.nombre_producto);
    setFiltroProductos([]);
    setCantidad(1);
  };

  // 🛒 Agregar al carrito y limpiar
  const handleAgregarAlCarrito = async () => {
    if (!productoSeleccionado || cantidad < 1 || !clienteId) {
      alert("⚠️ Selecciona un producto y un cliente antes de agregar.");
      return;
    }

    try {
      await agregarProductoAlCarrito(clienteId, productoSeleccionado.id_producto, cantidad);
      limpiarSeleccion();

      if (typeof actualizarCarrito === "function") {
        actualizarCarrito(); // ✅ Solo se llama si es una función válida
      } else {
        console.warn("⚠️ actualizarCarrito no está definido o no es una función.");
      }
    } catch (error) {
      alert("⚠️ Error al agregar producto.");
    }
  };

  // ❌ Eliminar del carrito
  const handleEliminarDelCarrito = async () => {
    if (!productoSeleccionado || !clienteId) {
      alert("⚠️ Selecciona un producto y un cliente antes de eliminar.");
      return;
    }

    try {
      await eliminarProductoDelCarrito(clienteId, productoSeleccionado.id_producto, cantidad);
      limpiarSeleccion();

      if (typeof actualizarCarrito === "function") {
        actualizarCarrito(); // ✅ Solo se llama si es una función válida
      } else {
        console.warn("⚠️ actualizarCarrito no está definido o no es una función.");
      }
    } catch (error) {
      alert("⚠️ Error al eliminar producto.");
    }
  };

  // 🔄 Limpiar selección después de agregar/eliminar producto
  const limpiarSeleccion = () => {
    setProductoSeleccionado(null);
    setQuery("");
    setCantidad(1);
  };

  return (
    <div className="busqueda-container">
      <h2 className="titulo">Producto</h2>

      {/* Barra de búsqueda */}
      <div className="busqueda-barra">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="🔍 Escriba el código, nombre o palabra clave..."
          className="input-busqueda"
        />
        <button
          onClick={handleBuscarEnAPI}
          disabled={!mostrarBotonBuscar}
          className={`btn-buscar ${mostrarBotonBuscar ? "activo" : "icono"}`}
        >
          🔍
        </button>
      </div>

      {/* Lista de sugerencias */}
      {filtroProductos.length > 0 && (
        <ul className="lista-sugerencias">
          {filtroProductos.slice(0, 5).map((producto) => (
            <li key={producto.codigo} onClick={() => handleSeleccionarProducto(producto)}>
              {producto.nombre_producto} - {producto.codigo}
            </li>
          ))}
        </ul>
      )}

      {/* Información del producto seleccionado */}
      {productoSeleccionado && (
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
              <span className="info-texto">{productoSeleccionado.categoria}</span>
            </div>

            <div className="campo">
              <label className="campo-label">Precio Unitario</label>
              <span className="info-texto">S/ {parseFloat(productoSeleccionado.precio_unitario).toFixed(2)}</span>
            </div>

            <div className="campo">
              <label className="campo-label">Precio Mayorista</label>
              <span className="info-texto">S/ {parseFloat(productoSeleccionado.precio_mayorista).toFixed(2)}</span>
            </div>

            <div className="campo">
              <label className="campo-label">Stock Disponible</label>
              <span className="info-texto">{productoSeleccionado.stock_disponible}</span>
            </div>
          </div>

          {/* Descripción del producto */}
          <div className="descripcion">
            <label className="campo-label">Descripción del producto:</label>
            <p className="descripcion-texto">{productoSeleccionado.descripcion}</p>
          </div>

          {/* Botones de acción abajo */}
          <div className="botones-agregar">
            <button className="btn-agregar" onClick={handleAgregarAlCarrito} disabled={!productoSeleccionado || !clienteId}>
              Agregar producto al carrito
            </button>
            <button className="btn-eliminar" onClick={handleEliminarDelCarrito} disabled={!productoSeleccionado || !clienteId}>
              Eliminar producto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
