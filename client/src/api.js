import axios from 'axios';

// In production (Vercel), VITE_API_URL points to the Render backend.
// In local dev, Vite's proxy handles /api → localhost:5000 automatically.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
