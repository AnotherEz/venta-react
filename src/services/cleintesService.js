import api from "./../api/apiconfig"; 

// Obtener todos los clientes
export const obtenerClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return null;
  }
};

// Crear un nuevo cliente
export const crearCliente = async (cliente) => {
  try {
    const response = await api.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return null;
  }
};

// Actualizar cliente
export const actualizarCliente = async (id, cliente) => {
  try {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return null;
  }
};

// Eliminar cliente
export const eliminarCliente = async (id) => {
  try {
    await api.delete(`/clientes/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return false;
  }
};
