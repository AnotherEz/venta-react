import * as reniecApi from '../api/reniecApi';

export const obtenerDatosPorDni = async (dni) => {
    try {
        return await reniecApi.buscarDni(dni);
    } catch (error) {
        console.error("Error obteniendo datos del DNI:", error);
        return null;
    }
};
