import * as reniecApi from './../api/reniecApi';

export const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await reniecApi.buscarDni(dni);
        if (response && response.success && response.data) {
            return response.data; // Devolver solo la información necesaria
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del DNI:", error);
        return null;
    }
};
