// src/validaciones/registro.ts
import * as yup from "yup";

export const registroSchema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  usuario: yup.string().required("El nombre de usuario es obligatorio"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Repite la contraseña")
});
