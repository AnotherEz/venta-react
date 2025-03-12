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
