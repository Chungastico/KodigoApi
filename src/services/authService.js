import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authService = {
    login: async (username, password) => {
    try {
        const response = await api.post('/api/V1/login', { username, password });
        const { token, user } = response.data;
        if (token) {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', JSON.stringify(user || { username }));
        return { success: true, user: user || { username }, token };
        } else {
        throw new Error('No se recibió el token de autenticación.');
        }
    } catch (error) {
        const msg = error.response?.data?.message || error.message || 'Error de conexión.';
        throw { success: false, message: msg };
    }
    },


    register: async (username, password) => {
    try {

    const response = await api.post('/api/V1/register', { usernamepassword });
    return { success: true, message: 'Registro exitoso. Por favor, inicia sesión.' };
    } catch (error) {
        const msg = error.response?.data?.message || error.message || 'Error al registrar usuario.';
        throw { success: false, message: msg };
    }
    },

    logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    },

    getCurrentUser: () => {
    try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('jwt_token');
        return user && token ? { ...JSON.parse(user), token } : null;
    } catch (e) { return null; } 
},

    getAuthToken: () => localStorage.getItem('jwt_token'),
};

export default authService;