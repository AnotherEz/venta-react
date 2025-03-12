import api from './../api/apiconfig';

export const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await api.get(`/reniec/${dni}`);
        if (response.data) {
            return response.data; // Devuelve todo el objeto para acceder a `id_cliente`
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
        const response = await api.get(`/ruc/${ruc}`);
        if (response.data) {
            return response.data; // Devuelve todo el objeto para acceder a `id_cliente`
        }

        console.warn("Cliente no encontrado en BD.");
        return null;
    } catch (error) {
        console.error("Error obteniendo datos del RUC:", error);
        return null;
    }
};
