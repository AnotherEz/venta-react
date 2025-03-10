import api from '../api';

// Procesar pago
export const procesarPago = async (datosPago) => {
  try {
    const response = await api.post('/pago', datosPago);
    return response.data;
  } catch (error) {
    console.error("Error al procesar pago:", error);
    return null;
  }
};
