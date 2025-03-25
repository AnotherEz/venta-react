// src/hooks/useBusquedaProductoCompra.js
import { useState, useEffect } from "react";
import { obtenerProductos, buscarProductos } from "../services/productoService";

/**
 * Hook para COMPRAS, con lógica de:
 * - Búsqueda local/API
 * - Selección de producto
 * - Lotes (cantidadLotes, precioPorLote, cantidadPorLote)
 * - Agregar/eliminar del carrito
 */
export function useBusquedaProductoCompra({
  carrito,
  setCarrito,
  setProductos,
}) {
  // --- Estados para la BÚSQUEDA ---
  const [productos, setListaProductos] = useState([]);
  const [filtroProductos, setFiltroProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarBotonBuscar, setMostrarBotonBuscar] = useState(false);

  // --- Estados para LOTES ---
  const [cantidadLotes, setCantidadLotes] = useState(1);
  const [precioPorLote, setPrecioPorLote] = useState(0);
  const [cantidadPorLote, setCantidadPorLote] = useState(1);

  // 1) Cargar productos iniciales
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

  // 2) Filtrar en local
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

  // 3) Manejo de input
  const handleInputChange = (valor) => {
    setQuery(valor);
    filtrarProductosLocal(valor);
  };

  // 4) Buscar en API si local no halla nada
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
      alert("⚠️ Error al buscar producto en API.");
    } finally {
      setLoading(false);
    }
  };

  // 5) Seleccionar producto
  const handleSeleccionarProducto = (prod) => {
    setProductoSeleccionado(prod);
    setQuery(prod.nombre_producto);
    setFiltroProductos([]);

    // Reset de lotes
    setCantidadLotes(1);
    setPrecioPorLote(0);
    setCantidadPorLote(1);
  };

  // 6) Agregar al carrito
  const handleAgregarAlCarrito = () => {
    if (!productoSeleccionado) {
      alert("⚠️ Selecciona un producto antes de agregar.");
      return;
    }
    // Cálculos de lotes
    const subtotal = cantidadLotes * precioPorLote;
    const unidades = cantidadLotes * cantidadPorLote;
    if (subtotal <= 0 || unidades <= 0) {
      alert("⚠️ Subtotal o unidades es 0. Revisa.");
      return;
    }

    const itemExistente = carrito.find(
      (p) => p.id_producto === productoSeleccionado.id_producto
    );

    let nuevoCarrito;
    if (itemExistente) {
      // Sumar lotes
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? {
              ...p,
              cantidadLotes: p.cantidadLotes + cantidadLotes,
              // Ejemplo: mantenemos la misma "precioPorLote", "cantidadPorLote"
              // Podrías hacer un promedio si quieres
              subtotal: p.subtotal + subtotal,
            }
          : p
      );
    } else {
      // Nuevo ítem
      nuevoCarrito = [
        ...carrito,
        {
          id_producto: productoSeleccionado.id_producto,
          nombre: productoSeleccionado.nombre_producto,
          presentacion: productoSeleccionado.presentacion,
          cantidadLotes,
          precioPorLote,
          cantidadPorLote,
          subtotal,
        },
      ];
    }
    setCarrito(nuevoCarrito);

    // Disminuir stock
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible - unidades }
          : prod
      )
    );

    console.log("✅ Agregado al carrito:", productoSeleccionado);
  };

  // 7) Eliminar del carrito
  const handleEliminarDelCarrito = () => {
    if (!productoSeleccionado) {
      alert("⚠️ Selecciona un producto antes de eliminar.");
      return;
    }
    const itemExistente = carrito.find(
      (p) => p.id_producto === productoSeleccionado.id_producto
    );
    if (!itemExistente) {
      alert("⚠️ El producto no está en el carrito.");
      return;
    }
    const nuevoCarrito = carrito.filter(
      (p) => p.id_producto !== productoSeleccionado.id_producto
    );
    setCarrito(nuevoCarrito);

    // Restaurar stock
    const unidades = itemExistente.cantidadLotes * itemExistente.cantidadPorLote;
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible + unidades }
          : prod
      )
    );
    console.log("❌ Eliminado del carrito:", productoSeleccionado);
  };

  // 8) Limpiar
  const limpiarSeleccion = () => {
    setProductoSeleccionado(null);
    setQuery("");
    setCantidadLotes(1);
    setPrecioPorLote(0);
    setCantidadPorLote(1);
  };

  return {
    // Estados
    productos,
    filtroProductos,
    productoSeleccionado,
    query,
    loading,
    mostrarBotonBuscar,

    // Lotes
    cantidadLotes,
    setCantidadLotes,
    precioPorLote,
    setPrecioPorLote,
    cantidadPorLote,
    setCantidadPorLote,

    // Métodos
    handleInputChange,
    handleBuscarEnAPI,
    handleSeleccionarProducto,
    handleAgregarAlCarrito,
    handleEliminarDelCarrito,
    limpiarSeleccion,
  };
}
