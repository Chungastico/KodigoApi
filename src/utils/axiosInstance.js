import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://apibookingsaccomodations-production.up.railway.app/api/V1', // ✅ con /V1
    headers: {
        'Content-Type': 'application/json'
    }
});

// Si estás usando autenticación, puedes agregar el token desde localStorage:
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
