export const MESSAGES = {
  validation: {
    nombreRequired: 'El nombre es obligatorio',
    usuarioRequired: 'El nombre de usuario es obligatorio',
    emailInvalid: 'El correo electrónico no es válido',
    passwordMin: 'La contraseña debe tener al menos 6 caracteres',
    IMDB_REQUIRED: 'El ID de IMDb es obligatorio',
    TITLE_REQUIRED: 'El título es obligatorio',
    YEAR_REQUIRED: 'El año es obligatorio',
    POSTER_REQUIRED: 'El póster es obligatorio',
  },  
  auth: {
    jwtSecretNotFound: 'La clave secreta JWT no está configurada en el entorno ',
    EMAIL_REGISTERED: 'El correo ya está registrado',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    EMAIL_IN_USE: 'El correo ya está registrado',
    
    
  },
  FAVORITES: {
    ADDED: 'Película guardada en favoritos exitosamente',
    ALREADY_EXISTS: 'Esta película ya está en tus favoritos',
    NOT_FOUND: 'pelicula no encontrado',
    
    
  },
  USER: {
    NOT_FOUND: 'Usuario no encontrado',
  },
  
};

export const CONSTANTS = {
  SALT_ROUNDS: 10,
  TOKEN_EXPIRES_IN: '1h',
  JWT_DEFAULT_SECRET: 'defaultSecret', 
  OMDB_API_KEY: process.env.OMDB_API_KEY || '3c9fa348',
  OMDB_API_URL: process.env.OMDB_API_URL || 'http://www.omdbapi.com',
};
