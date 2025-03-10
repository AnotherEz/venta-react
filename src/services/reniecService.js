import * as reniecApi from './../api/reniecApi';

export const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await reniecApi.buscarDni(dni);

        if (response && response.nombre_cliente) {
            return response.nombre_cliente; // 🔹 Extrae y devuelve solo el nombre completo
        }

        console.warn("Cliente no encontrado en BD.");
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del DNI:", error);
        return null;
    }
};
