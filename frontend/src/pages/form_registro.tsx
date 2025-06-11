import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registroSchema } from "../validaciones/registro";
import api from "../api";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registroSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { confirmPassword, ...userData } = data;
      console.log("Datos que se envían al backend:", userData); 

      const response = await api.post("/auth/register", userData);
      console.log("Respuesta del backend:", response.data);

      setSnackbar({
        open: true,
        message: "Registro exitoso. Redirigiendo al login...",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/Login"); // Cambia esto a la ruta de tu login
      }, 2000);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Error al registrar. Intenta de nuevo.",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Registro de Usuario
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre completo"
            {...register("nombre")}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            fullWidth
          />
          <TextField
            label="Nombre de usuario"
            {...register("usuario")}
            error={!!errors.usuario}
            helperText={errors.usuario?.message}
            fullWidth
          />
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
          <TextField
            label="Repetir contraseña"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </Box>
      </Paper>

      {/* Snackbar para alertas */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
