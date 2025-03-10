import api from "./../api/apiconfig";

// Obtener todas las ventas
export const obtenerVentas = async () => {
  try {
    const response = await api.get('/ventas');
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return [];
  }
};

// Obtener una venta por ID
export const obtenerVentaPorId = async (id) => {
  try {
    const response = await api.get(`/ventas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener venta:", error);
    return null;
  }
};

// Registrar una venta
export const registrarVenta = async (venta) => {
  try {
    const response = await api.post('/venta', venta);
    return response.data;
  } catch (error) {
    console.error("Error al registrar venta:", error);
    return null;
  }
};

// Eliminar una venta
export const eliminarVenta = async (id) => {
  try {
    await api.delete(`/ventas/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    return false;
  }
};
