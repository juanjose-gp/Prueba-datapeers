import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  MenuItem,
  Button,
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
  comentario?: string;
  calificacion?: number;
}

export default function FavoritesPage() {
  const [favoritos, setFavoritos] = useState<Movie[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: number]: string }>({});
  const [calificaciones, setCalificaciones] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // Verificar sesión y cargar favoritos
  useEffect(() => {
    const verificarSesionYTraerFavoritos = async () => {
      try {
        const authRes = await fetch("http://localhost:3000/auth/me", {
          credentials: "include",
        });

        if (!authRes.ok) {
          throw new Error("Debes iniciar sesión para ver tus favoritos.");
        }

        const res = await fetch("http://localhost:3000/favoritos", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const resData = await res.json();
          throw new Error(resData.message || "Error al obtener favoritos.");
        }

        const data: Movie[] = await res.json();
        setFavoritos(data);

        // Inicializar comentarios y calificaciones
        const nuevosComentarios: { [key: number]: string } = {};
        const nuevasCalificaciones: { [key: number]: number } = {};
        data.forEach((fav) => {
          nuevosComentarios[fav.id] = fav.comentario || "";
          nuevasCalificaciones[fav.id] = fav.calificacion || 0;
        });
        setComentarios(nuevosComentarios);
        setCalificaciones(nuevasCalificaciones);
      } catch (err: any) {
        setError(err.message || "Error al cargar los favoritos.");
        setSnackbarOpen(true);
        setTimeout(() => {
          limpiarEstado();
          navigate("/login");
        }, 2000);
      }
    };

    verificarSesionYTraerFavoritos();
  }, [navigate]);

  // Guardar comentario y calificación
  const handleGuardarComentario = async (id: number) => {
    try {
     const res = await fetch(`http://localhost:3000/favoritos/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comentario: comentarios[id],
          calificacion: calificaciones[id],
        }),
      });

      if (!res.ok) {
        throw new Error("Error al guardar comentario.");
      }

      setError("Comentario guardado correctamente.");
    } catch (err: any) {
      setError(err.message);
    }
    setSnackbarOpen(true);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    limpiarEstado();
    navigate("/login");
  };

  // 🧹 Limpieza de estados
  const limpiarEstado = () => {
    setFavoritos([]);
    setComentarios({});
    setCalificaciones({});
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Tus Películas Favoritas
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {favoritos.map((movie) => (
            <Grid item key={movie.id}>
              <Card
                sx={{
                  width: 250,
                  backgroundColor: "#1c1c1c",
                  color: "white",
                  p: 1,
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

                  <TextField
                    label="Comentario"
                    multiline
                    rows={2}
                    fullWidth
                    variant="filled"
                    margin="dense"
                    value={comentarios[movie.id] || ""}
                    onChange={(e) =>
                      setComentarios({ ...comentarios, [movie.id]: e.target.value })
                    }
                    sx={{
                      mt: 1,
                      input: { color: "white" },
                      textarea: { color: "white" },
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    InputProps={{
                      style: { color: "white" },
                    }}
                  />

                  <TextField
                    select
                    fullWidth
                    label="Calificación"
                    variant="filled"
                    margin="dense"
                    value={calificaciones[movie.id] || 0}
                    onChange={(e) =>
                      setCalificaciones({ ...calificaciones, [movie.id]: Number(e.target.value) })
                    }
                    sx={{
                      input: { color: "white" },
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    InputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleGuardarComentario(movie.id)}
                    sx={{ mt: 1 }}
                  >
                    Guardar
                  </Button>
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
            severity={error.includes("correctamente") ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}
