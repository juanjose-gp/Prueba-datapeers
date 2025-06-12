import axios from 'axios';

const API = 'http://localhost:3000/movies';

export const searchMovies = async (title: string) => {
  const token = localStorage.getItem('token');
  console.log('🎟️ Token que se va a enviar:', token); // ← VERIFICA SI LLEGA AQUÍ

  return axios.get(`${API}/search?title=${encodeURIComponent(title)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    console.log('✅ Respuesta de /movies/search:', res);
    return res.data;
  }).catch(err => {
    console.error('❌ Error en searchMovies:', err.response);
    throw err;
  });
};
