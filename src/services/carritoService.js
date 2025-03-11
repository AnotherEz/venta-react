import api from "./../api/apiconfig";

// 🔹 Obtener el carrito por su ID
export const obtenerCarritoPorId = async (clienteId) => {
    try {
        const response = await api.get(`/carrito/${clienteId}`);
        console.log("📌 API Respuesta carrito:", response.data); // Debug API
        return response.data;
    } catch (error) {
        console.error("⚠️ Error al obtener carrito:", error?.response?.data || error.message);
        return { id_carrito: null, productos: [], total: 0 }; // Estructura vacía en caso de error
    }
};

  

// 🛒 Agregar un producto al carrito con validaciones
export const agregarProductoAlCarrito = async (carritoId, productoId, cantidad) => {
    try {
      const response = await api.post(`/carrito/agregar`, {
        carrito_id: carritoId,
        producto_id: productoId,
        cantidad
      });
  
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        console.error("⚠️ Respuesta inesperada al agregar producto:", response);
        return null;
      }
    } catch (error) {
      console.error("⚠️ Error al agregar producto al carrito:", error?.response?.data || error.message);
      return null;
    }
  };
  

export const eliminarProductoDelCarrito = async (carritoId, productoId, cantidad) => {
    try {
      const response = await api.post(`/carrito/eliminar`, { 
        carrito_id: carritoId, 
        producto_id: productoId, 
        cantidad 
      });
  
      if (response.status === 200 || response.status === 201) {
        return response.data; 
      } else {
        console.error("⚠️ Respuesta inesperada al eliminar producto:", response);
        return null;
      }
    } catch (error) {
      console.error("⚠️ Error al eliminar producto del carrito:", error?.response?.data || error.message);
      return null;
    }
  };
  

// 🗑️ Vaciar carrito por cliente
export const vaciarCarrito = async (carritoId) => {
  try {
    await api.delete(`/carrito/${carritoId}`);
    return true;
  } catch (error) {
    console.error("⚠️ Error al vaciar carrito:", error?.response?.data || error.message);
    return false;
  }
};

// 🔄 Actualizar la cantidad de un producto en el carrito
export const actualizarCantidadProductoCarrito = async (carritoId, productoId, nuevaCantidad) => {
  try {
    const response = await api.put(`/carrito-producto/${productoId}`, {
      carrito_id: carritoId,
      cantidad: nuevaCantidad
    });

    return response.data;
  } catch (error) {
    console.error("⚠️ Error al actualizar cantidad en el carrito:", error?.response?.data || error.message);
    return null;
  }
};
