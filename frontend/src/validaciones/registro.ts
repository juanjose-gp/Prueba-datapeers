// src/validaciones/registro.ts
import * as yup from "yup";

export const registroSchema = yup.object({
  nombre: yup
  .string()
  .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras")
  .required("El nombre es obligatorio"),

  usuario: yup.string().required("El nombre de usuario es obligatorio"),

  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),

  password: yup
  .string()
  .min(6, "Mínimo 6 caracteres")
  .matches(/[a-z]/, "Debe contener una letra minúscula")
  .matches(/[A-Z]/, "Debe contener una letra mayúscula")
  .matches(/\d/, "Debe contener un número")
  .matches(/[@$!%*?&]/, "Debe contener un símbolo especial")
  .required("La contraseña es obligatoria"),

  confirmPassword: yup
  .string()
  .min(6, "Mínimo 6 caracteres")
  .matches(/[a-z]/, "Debe contener una letra minúscula")
  .matches(/[A-Z]/, "Debe contener una letra mayúscula")
  .matches(/\d/, "Debe contener un número")
  .matches(/[@$!%*?&]/, "Debe contener un símbolo especial")
  .required("La contraseña es obligatoria")
  .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
  .required("Repite la contraseña")

});
