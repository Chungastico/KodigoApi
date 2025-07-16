import axios from 'axios';

const API_BASE_URL = 'https://apibookingsaccomodations-production.up.railway.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const Accomodations = {
    // Lista todos los alojamientos
    getAccomodations: async () => {
        try {
            const token = localStorage.getItem("token"); // recupera el token del almacenamiento local
            if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión."); //manejo de errores

            const response = await axios.get(
                `${API_BASE_URL}/api/V1/accomodations`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, //asegura el token
                    },
                }
            );
            console.log(response);
            return response.data; //devuelve los datos de alojamientos
        } catch (error) {
            console.error("Error al obtener los datos de accommodations", error);
        }
    },

    // Crea un nuevo alojamiento
    createAccomodation: async (newData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión.");

            const response = await axios.post(
                `${API_BASE_URL}/api/V1/accomodation`,
                newData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Alojamiento creado exitosamente:", response);
            return response.data;
        } catch (error) {
            console.error("Error al crear el alojamiento:", error.response?.data || error.message);
        }
    },

    // Actualiza un alojamiento existente
    updateAccomodation: async (updatedData, id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión.");

            const response = await axios.put(
                `${API_BASE_URL}/api/V1/accomodation/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Alojamiento actualizado con éxito:", response);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el alojamiento:", error.response?.data || error.message);
        }
    },

    // Obtiene un alojamiento por ID
    getAccomodationById: async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión.");

            const response = await axios.get(
                `${API_BASE_URL}/api/V1/accomodation/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Alojamiento obtenido:", response);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el alojamiento:", error.response?.data || error.message);
        }
    }
};

export default Accomodations;
