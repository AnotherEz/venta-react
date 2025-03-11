import * as reniecApi from './../api/reniecApi';

export const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await reniecApi.buscarDni(dni);
        
        if (response && response.nombre_cliente && response.id_cliente) {
            return {
                id_cliente: response.id_cliente,  // 🔹 Guarda el ID del cliente
                nombre_cliente: response.nombre_cliente // 🔹 Guarda el nombre del cliente
            };
        }

        console.warn("Cliente no encontrado en BD.");
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del DNI:", error);
        return null;
    }
};
