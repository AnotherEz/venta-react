// src/services/carritoService.js

import api from "./../api/apiconfig"; 

// Obtener el carrito de un cliente
export const obtenerCarritoPorCliente = async (clienteId) => {
  try {
    const response = await api.get(`/carrito/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    return null;
  }
};

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (carritoId, producto) => {
  try {
    const response = await api.post(`/carrito-producto`, { carrito_id: carritoId, ...producto });
    return response.data;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return null;
  }
};

// Vaciar carrito
export const vaciarCarrito = async (carritoId) => {
  try {
    await api.delete(`/carrito/${carritoId}`);
    return true;
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    return false;
  }
};
