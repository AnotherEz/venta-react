import api from "./../api/apiconfig";

// Obtener el carrito de un cliente
export const obtenerCarritoPorCliente = async (clienteId) => {
  try {
    const response = await api.get(`/carrito/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("⚠️ Error al obtener carrito:", error?.response?.data || error.message);
    return { productos: [], total: 0 }; // Devolver estructura vacía en caso de error
  }
};

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (carritoId, producto) => {
  try {
    const response = await api.post(`/carrito-producto`, { carrito_id: carritoId, ...producto });
    return response.data;
  } catch (error) {
    console.error("⚠️ Error al agregar producto al carrito:", error?.response?.data || error.message);
    return null;
  }
};

// Vaciar carrito
export const vaciarCarrito = async (carritoId) => {
  try {
    await api.delete(`/carrito/${carritoId}`);
    return true;
  } catch (error) {
    console.error("⚠️ Error al vaciar carrito:", error?.response?.data || error.message);
    return false;
  }
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (carritoId, productoId) => {
  try {
    const response = await api.delete(`/carrito-producto/${productoId}`);
    return response.data;
  } catch (error) {
    console.error("⚠️ Error al eliminar producto del carrito:", error?.response?.data || error.message);
    return null;
  }
};
