import api from '../apiconfig';

export const buscarDni = async (dni) => {
    try {
        const response = await api.get(`/reniec/${dni}`);
        return response.data;
    } catch (error) {
        console.error("Error en la consulta del DNI:", error);
        throw error;
    }
};
