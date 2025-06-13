import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validaciones/login";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user_context"; 
import Layout from "../components/layout";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { reloadUser } = useUser(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await reloadUser(); //traer el nombre de usuario al layout
        navigate("/favoritos");
      } else {
        const errorRes = await response.json();
        setError(errorRes.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de red al iniciar sesión");
    }
  };

  return (
    <Layout>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Iniciar sesión
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Correo electrónico"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿No tienes cuenta?{" "}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/registro")}
          sx={{ textTransform: "none", padding: 0, minWidth: "unset" }}
        >
          Registrate
        </Button>
      </Typography>
    </Container>
    </Layout>
  );
}
