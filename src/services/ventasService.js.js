import api from "./../api/apiconfig";

const endpoint = "/ventas"; // Ruta base para las ventas

// Obtener todas las ventas desde la API
export const obtenerVentas = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo las ventas:", error);
    return [];
  }
};

// Obtener una venta por ID
export const obtenerVentaPorId = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la venta con ID ${id}:`, error);
    return null;
  }
};

// Crear una nueva venta
export const crearVenta = async (nuevaVenta) => {
  try {
    const response = await api.post(endpoint, nuevaVenta);
    return response.data;
  } catch (error) {
    console.error("Error creando una nueva venta:", error);
    return null;
  }
};

// Actualizar una venta existente
export const actualizarVenta = async (id, datosVenta) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, datosVenta);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la venta con ID ${id}:`, error);
    return null;
  }
};

// Eliminar una venta
export const eliminarVenta = async (id) => {
  try {
    await api.delete(`${endpoint}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error eliminando la venta con ID ${id}:`, error);
    return false;
  }
};
