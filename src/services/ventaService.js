import api from "./../api/apiconfig";

// Obtener todas las ventas
export const obtenerVentas = async () => {
  try {
    const response = await api.get('/ventas'); // GET /ventas
    return response.data; // Devuelve el array de ventas
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return [];
  }
};
export const registrarVenta = async (datosVenta) => {
    try {
      const response = await api.post("/ventas", datosVenta);
      return response.data; // { venta: {...} }
    } catch (error) {
      console.error("Error al registrar venta:", error.response?.data || error.message);
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
