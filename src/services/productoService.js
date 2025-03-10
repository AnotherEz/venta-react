import api from './../api/apiconfig';

// Obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

// Buscar productos por nombre, categoría o código (mejorado)
export const buscarProductos = async (query) => {
  try {
    const filtros = {
      nombre: query,
      codigo: query,
      categoria: query
    };

    const response = await api.get('/productos/buscar', { params: filtros });
    return response.data;
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return [];
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
};

// Crear un nuevo producto
export const crearProducto = async (producto) => {
  try {
    const response = await api.post('/productos', producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

// Actualizar producto
export const actualizarProducto = async (id, producto) => {
  try {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return null;
  }
};

// Eliminar producto
export const eliminarProducto = async (id) => {
  try {
    await api.delete(`/productos/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return false;
  }
};
