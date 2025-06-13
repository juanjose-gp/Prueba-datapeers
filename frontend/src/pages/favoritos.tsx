import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Snackbar,
} from "@mui/material";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}


export default function FavoritesPage() {
  const [favoritos, setFavoritos] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Debes iniciar sesión para ver tus favoritos.");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/favoritos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const resData = await res.json();
          throw new Error(resData.message || "Error al obtener favoritos.");
        }

        const data: Movie[] = await res.json();
        setFavoritos(data);
      } catch (err: any) {
        console.error("❌ Error al obtener favoritos:", err);
        setError(err.message || "No se pudieron cargar los favoritos.");
        setSnackbarOpen(true);
      }
    };

    fetchFavoritos();
  }, [navigate]);

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Tús Películas Favoritas
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {favoritos.map((movie) => (
            <Grid item key={movie.id}>
              <Card
                sx={{
                  width: 200,
                  backgroundColor: "#1c1c1c",
                  color: "white",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    movie.poster !== "N/A"
                      ? movie.poster
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    {movie.year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}
