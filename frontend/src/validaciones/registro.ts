import * as Yup from "yup";

export const registroSchema = Yup.object({
  nombre: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),

  usuario: Yup.string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),

  email: Yup.string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo válido"),

  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres")
});
