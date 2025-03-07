import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-venta-laravel.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;