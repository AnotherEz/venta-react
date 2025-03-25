// src/hooks/useBusquedaProducto.js
import { useState, useEffect } from "react";
import { obtenerProductos, buscarProductos } from "../services/productoService";

export function useBusquedaProducto({ carrito, setCarrito, clienteId, setProductos }) {
  const [productos, setListaProductos] = useState([]);
  const [filtroProductos, setFiltroProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarBotonBuscar, setMostrarBotonBuscar] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  // 1) Cargar productos desde la API al montar
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const productosAPI = await obtenerProductos();
        setListaProductos(productosAPI);
      } catch (error) {
        console.error("⚠️ Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  // 2) Manejo de atajos de teclado (+ para agregar, Ctrl para limpiar)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "+" && productoSeleccionado) {
        e.preventDefault();
        handleAgregarAlCarrito();
      }
      if (e.ctrlKey && e.key === "Control") {
        e.preventDefault();
        limpiarSeleccion();
        // Opcional: enfocar un campo en la UI (lo harías en la vista)
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [productoSeleccionado, cantidad]);

  // 3) Filtrar productos localmente según query
  const filtrarProductosLocal = (value) => {
    if (!value.trim()) {
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

  // 4) Manejo del input de búsqueda
  const handleInputChange = (value) => {
    setQuery(value);
    filtrarProductosLocal(value);
  };

  // 5) Buscar en API si no hay coincidencias locales
  const handleBuscarEnAPI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await buscarProductos({
        nombre: query,
        codigo: query,
        categoria: query,
      });
      setFiltroProductos(result.length > 0 ? result : []);
      setMostrarBotonBuscar(result.length === 0);
    } catch (error) {
      alert("⚠️ Error al buscar producto.");
    } finally {
      setLoading(false);
    }
  };

  // 6) Seleccionar un producto (de la lista de sugerencias)
  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setQuery(producto.nombre_producto);
    setFiltroProductos([]);
    setCantidad(1);
  };

  // 7) Agregar producto al carrito
  const handleAgregarAlCarrito = () => {
    if (!productoSeleccionado || cantidad < 1) {
      alert("⚠️ Selecciona un producto antes de agregar.");
      return;
    }
    if (cantidad > productoSeleccionado.stock_disponible) {
      alert("⚠️ Stock insuficiente.");
      return;
    }

    const productoExistente = carrito.find(
      (p) => p.id_producto === productoSeleccionado.id_producto
    );

    let nuevoCarrito;
    if (productoExistente) {
      // Si ya existe en el carrito, aumentar cantidad
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? {
              ...p,
              cantidad: p.cantidad + cantidad,
              precio_normal: p.precio_unitario * (p.cantidad + cantidad),
              descuento:
                p.descuento + productoSeleccionado.descuento * cantidad,
              subtotal:
                p.precio_unitario * (p.cantidad + cantidad) -
                (p.descuento + productoSeleccionado.descuento * cantidad),
            }
          : p
      );
    } else {
      // Agregar nuevo producto al carrito
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
          precio_normal:
            productoSeleccionado.precio_unitario * cantidad,
          descuento: productoSeleccionado.descuento * cantidad,
          subtotal:
            productoSeleccionado.precio_unitario * cantidad -
            productoSeleccionado.descuento * cantidad,
        },
      ];
    }
    setCarrito(nuevoCarrito);

    // Disminuir stock en la lista local
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? {
              ...prod,
              stock_disponible: prod.stock_disponible - cantidad,
            }
          : prod
      )
    );

    limpiarSeleccion();
  };

  // 8) Eliminar producto del carrito
  const handleEliminarDelCarrito = () => {
    if (!productoSeleccionado) {
      alert("⚠️ Selecciona un producto antes de eliminar.");
      return;
    }
    const productoExistente = carrito.find(
      (p) => p.id_producto === productoSeleccionado.id_producto
    );
    if (!productoExistente) {
      alert("⚠️ El producto no está en el carrito.");
      return;
    }

    let nuevoCarrito;
    if (productoExistente.cantidad > cantidad) {
      // Reducir cantidad
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? {
              ...p,
              cantidad: p.cantidad - cantidad,
              precio_normal:
                p.precio_unitario * (p.cantidad - cantidad),
              descuento:
                p.descuento -
                productoSeleccionado.descuento * cantidad,
              subtotal:
                p.precio_unitario * (p.cantidad - cantidad) -
                (p.descuento -
                  productoSeleccionado.descuento * cantidad),
            }
          : p
      );
    } else {
      // Eliminar el producto por completo
      nuevoCarrito = carrito.filter(
        (p) => p.id_producto !== productoSeleccionado.id_producto
      );
    }

    setCarrito(nuevoCarrito);

    // Restaurar stock
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? {
              ...prod,
              stock_disponible: prod.stock_disponible + cantidad,
            }
          : prod
      )
    );

    limpiarSeleccion();
  };

  // 9) Limpiar selección
  const limpiarSeleccion = () => {
    setProductoSeleccionado(null);
    setQuery("");
    setCantidad(1);
  };

  return {
    // Estados
    productos, // por si quieres usarlo
    filtroProductos,
    productoSeleccionado,
    query,
    loading,
    mostrarBotonBuscar,
    cantidad,

    // Funciones / métodos
    handleInputChange,
    handleBuscarEnAPI,
    handleSeleccionarProducto,
    handleAgregarAlCarrito,
    handleEliminarDelCarrito,
    limpiarSeleccion,
    setCantidad,
  };
}
