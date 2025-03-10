import React, { useState, useEffect } from "react";
import { obtenerProductos, buscarProductos } from "./../services/productoService";
import "./../assets/busqproduct.css"; // Estilos del componente

export default function BusquedaProductoUI() {
  const [productos, setProductos] = useState([]); // Todos los productos precargados
  const [filtroProductos, setFiltroProductos] = useState([]); // Lista filtrada en tiempo real
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto final seleccionado
  const [query, setQuery] = useState(""); // Texto de búsqueda
  const [loading, setLoading] = useState(false); // Estado de carga

  // 🔹 Cargar todos los productos al inicio para filtrar en el frontend
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const productosAPI = await obtenerProductos();
        setProductos(productosAPI);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // 🔹 Filtrar productos en tiempo real a medida que escribe
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltroProductos([]);
      return;
    }

    // Filtrar en frontend
    const resultados = productos.filter((prod) =>
      prod.nombre_producto.toLowerCase().includes(value.toLowerCase()) ||
      prod.codigo.toLowerCase().includes(value.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(value.toLowerCase())
    );

    setFiltroProductos(resultados);
  };

  // 🔹 Buscar en la API si el usuario no encuentra lo que busca
  const handleBuscarEnAPI = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = await buscarProductos(query);
      if (result.length > 0) {
        setFiltroProductos(result);
      } else {
        alert("Producto no encontrado.");
        setFiltroProductos([]);
      }
    } catch (error) {
      alert("Error al buscar producto.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Seleccionar un producto de la lista
  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setQuery(producto.nombre_producto); // Mostrar el nombre en la barra de búsqueda
    setFiltroProductos([]); // Ocultar sugerencias
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
        <button onClick={handleBuscarEnAPI} disabled={loading} className="btn-buscar">
          {loading ? "Buscando..." : "Buscar"}
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

      {/* Sección de detalles del producto seleccionado */}
      {productoSeleccionado && (
        <div className="detalle-producto">
          <div className="campo">
            <label className="campo-label">Cantidad</label>
            <input type="number" min="1" defaultValue="1" className="cantidad-input" />
          </div>

          <div className="campo">
            <label className="campo-label">Categoría</label>
            <span className="info-texto">{productoSeleccionado.categoria}</span>
          </div>

          <div className="campo">
            <label className="campo-label">Precio Unitario</label>
            <span className="info-texto">
              S/ {parseFloat(productoSeleccionado.precio_unitario).toFixed(2)}
            </span>
          </div>

          <div className="campo">
            <label className="campo-label">Precio Mayorista</label>
            <span className="info-texto">
              S/ {parseFloat(productoSeleccionado.precio_mayorista).toFixed(2)}
            </span>
          </div>

          <div className="campo">
            <label className="campo-label">Stock Disponible</label>
            <span className="info-texto">{productoSeleccionado.stock_disponible}</span>
          </div>

          <div className="descripcion">
            <label className="campo-label">Descripción del producto:</label>
            <p className="descripcion-texto">{productoSeleccionado.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
