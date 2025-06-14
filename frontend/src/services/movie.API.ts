import axios from 'axios';

const API = 'http://localhost:3000/movies';

export const searchMovies = async (title: string) => {
  return axios.get(`${API}/search?title=${encodeURIComponent(title)}`, {
    withCredentials: true, 
  }).then(res => {
    return res.data;
  }).catch(err => {
    throw err;
  });
};
