import api from './apiconfig.js';

export const buscarDni = async (dni) => {
    try {
        const response = await api.get(`/reniec/${dni}`);
        return response.data;
    } catch (error) {
        console.error("Error en la consulta del DNI:", error);
        throw error;
    }
};

export const buscarRuc = async (ruc) => {
    try {
        const response = await api.get(`/ruc/${ruc}`);
        return response.data;
    } catch (error) {
        console.error("Error en la consulta del RUC:", error);
        throw error;
    }
};
