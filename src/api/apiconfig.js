import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cambiar process.env por import.meta.env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;
