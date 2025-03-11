import * as reniecApi from './../api/reniecApi';

export const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await reniecApi.buscarDni(dni);

        if (response) {
            return response; // ✅ Devuelve todo el objeto para acceder a `id_cliente`
        }

        console.warn("Cliente no encontrado en BD.");
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del DNI:", error);
        return null;
    }
};

export const obtenerDatosPorRuc = async (ruc) => {
    try {
        const response = await reniecApi.buscarRuc(ruc);

        if (response) {
            return response; // ✅ Devuelve todo el objeto para acceder a `id_cliente`
        }

        console.warn("Cliente no encontrado en BD.");
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del RUC:", error);
        return null;
    }
};
