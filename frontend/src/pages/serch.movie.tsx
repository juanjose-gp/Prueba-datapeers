import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/movie.API';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Layout from '../components/layout';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface MovieAPI {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await searchMovies(query);
      const { Search } = response;
      const adaptadas: Movie[] = (Search || []).map((m: MovieAPI) => ({
        imdbID: m.imdbID,
        title: m.Title,
        year: m.Year,
        poster: m.Poster,
      }));
      setMovies(adaptadas);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        setError('Inicia sesión antes de hacer la búsqueda.');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Ocurrió un error al buscar películas.');
        setSnackbarOpen(true);
      }
    }
  };

  const guardarFavorito = async (movie: Movie) => {
  const token = localStorage.getItem('token');
  console.log('📦 Token enviado a /favoritos:', token);

  try {
    const res = await fetch('http://localhost:3000/favoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    });

    const resData = await res.json();
    console.log('✅ Respuesta del backend al guardar favorito:', resData);

    if (!res.ok && res.status !== 200) {
      throw new Error(resData.message || 'Error al guardar la película');
    }

    // Si la película ya está en favoritos
    if (resData.message?.includes('ya está en tus favoritos')) {
      setError('⚠️ Esta película ya está en tus favoritos');
    } else {
      setFavoritos((prev) => [...prev, movie.imdbID]);
      setError('✅ Película guardada en favoritos');
    }

    setSnackbarOpen(true);
  } catch (err) {
    console.error('❌ Error al guardar favorito', err);
    setError('No se pudo guardar la película como favorita.');
    setSnackbarOpen(true);
  }
};


return (
  <Layout>
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        ¿QUÉ PIENSAS VER HOY?
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <TextField
          variant="outlined"
          label="Buscar película"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            backgroundColor: 'white',
            input: { color: 'black' },
            label: { color: 'gray' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'black' },
            },
          }}
        />
        <Button variant="contained" onClick={handleSearch} color="primary">
          Buscar
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.imdbID}>
            <Card sx={{ width: 200, backgroundColor: '#1c1c1c', color: 'white' }}>
              <CardMedia
                component="img"
                image={
                  movie.poster !== 'N/A'
                    ? movie.poster
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
                    <Typography variant="caption" color="gray">{movie.year}</Typography>
                  </Box>
                  <IconButton onClick={() => guardarFavorito(movie)} color="primary">
                    {favoritos.includes(movie.imdbID) ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  </Layout>
);
};
