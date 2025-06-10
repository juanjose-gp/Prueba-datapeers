import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registroSchema } from "../validaciones/registro";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registroSchema)
  });

  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
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

          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
