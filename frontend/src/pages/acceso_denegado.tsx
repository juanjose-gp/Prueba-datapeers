import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccesoDenegado() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        🚫 Acceso denegado
      </Typography>
      <Typography variant="body1" gutterBottom>
        Debes iniciar sesión antes de utilizar esta función.
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/layout')}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
}
