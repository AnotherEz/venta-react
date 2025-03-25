import React, { useState, useEffect } from "react";
import { obtenerProductos, buscarProductos } from "../services/productoService";
import "./../assets/busqproduct.css";

export default function BusquedaProductoUI({ clienteId, carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);
  const [filtroProductos, setFiltroProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarBotonBuscar, setMostrarBotonBuscar] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  // 🔹 Cargar productos desde la API
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
  // 🔹 Atajos de teclado para agregar y limpiar
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "+" && productoSeleccionado) {
      e.preventDefault();
      handleAgregarAlCarrito();
    }
    if (e.ctrlKey && e.key === "Control") {
      e.preventDefault();
      limpiarSeleccion();
      document.getElementById("input-busqueda").focus(); // 🔹 Enfocar el campo de búsqueda
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [productoSeleccionado, cantidad]);


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

  // 🛒 **Agregar producto al carrito (Solo en frontend)**
  const handleAgregarAlCarrito = () => {
    if (!productoSeleccionado || cantidad < 1) {
      alert("⚠️ Selecciona un producto antes de agregar.");
      return;
    }
  
    if (cantidad > productoSeleccionado.stock_disponible) {
      alert("⚠️ Stock insuficiente.");
      return;
    }
  
    const productoExistente = carrito.find((p) => p.id_producto === productoSeleccionado.id_producto);
  
    let nuevoCarrito;
    if (productoExistente) {
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? { 
              ...p, 
              cantidad: p.cantidad + cantidad,
              precio_normal: p.precio_unitario * (p.cantidad + cantidad),
              descuento: p.descuento + (productoSeleccionado.descuento * cantidad), 
              subtotal: (p.precio_unitario * (p.cantidad + cantidad)) - (p.descuento + (productoSeleccionado.descuento * cantidad))
            }
          : p
      );
    } else {
      nuevoCarrito = [
        ...carrito,
        {
          id_producto: productoSeleccionado.id_producto,
          codigo: productoSeleccionado.codigo,
          nombre: productoSeleccionado.nombre_producto,
          categoria: productoSeleccionado.categoria,
          presentacion: productoSeleccionado.presentacion,
          cantidad,
          precio_unitario: productoSeleccionado.precio_unitario,
          precio_normal: productoSeleccionado.precio_unitario * cantidad,
          descuento: productoSeleccionado.descuento * cantidad,
          subtotal: (productoSeleccionado.precio_unitario * cantidad) - (productoSeleccionado.descuento * cantidad),
        },
      ];
    }
  
    setCarrito(nuevoCarrito);
  
    // 🔹 **Disminuir stock en la lista de productos**
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible - cantidad }
          : prod
      )
    );
  
    limpiarSeleccion();
  };
  

  const handleEliminarDelCarrito = () => {
    if (!productoSeleccionado) {
      alert("⚠️ Selecciona un producto antes de eliminar.");
      return;
    }
  
    const productoExistente = carrito.find((p) => p.id_producto === productoSeleccionado.id_producto);
  
    if (!productoExistente) {
      alert("⚠️ El producto no está en el carrito.");
      return;
    }
  
    let nuevoCarrito;
    if (productoExistente.cantidad > cantidad) {
      // 🔹 **Reducir cantidad y recalcular precios**
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? {
              ...p,
              cantidad: p.cantidad - cantidad,
              precio_normal: p.precio_unitario * (p.cantidad - cantidad),
              descuento: p.descuento - (productoSeleccionado.descuento * cantidad),
              subtotal: (p.precio_unitario * (p.cantidad - cantidad)) - (p.descuento - (productoSeleccionado.descuento * cantidad)),
            }
          : p
      );
    } else {
      // 🔹 **Eliminar producto del carrito si la cantidad es 0**
      nuevoCarrito = carrito.filter((p) => p.id_producto !== productoSeleccionado.id_producto);
    }
  
    setCarrito(nuevoCarrito);
  
    // 🔹 **Restaurar stock en la lista de productos**
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible + cantidad }
          : prod
      )
    );
  
    limpiarSeleccion();
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
        id="input-busqueda" // 🔹 Agrega un ID para que podamos enfocar con `CTRL`
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
          {filtroProductos.map((producto) => (
            <li key={producto.codigo} onClick={() => handleSeleccionarProducto(producto)}>
              {producto.nombre_producto} - {producto.codigo} (Stock: {producto.stock_disponible})
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
