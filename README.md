# Proyecto: Plataforma de Películas.

Aplicación Fullstack desarrollada con **NestJS** (backend) y **React** (frontend) que permite a los usuarios autenticarse, buscar películas desde la API de OMDb, guardar sus favoritas, y calificarlas/comentarlas.

---

## Tecnologías Utilizadas.

### Backend

* NestJS
* TypeORM
* PostgreSQL
* JWT (con cookies HttpOnly)

### Frontend

* React + Vite
* React Router
* React Hook Form
* Material UI (MUI)

---

## Instalación del proyecto.
# Instalación de PostgreSQL y Restauración de Base de Datos.

Este proyecto utiliza PostgreSQL como sistema de gestión de base de datos. Para que funcione correcatmente se debe instalar PostgreSQL en tu PC y restaurar la base de datos del archivo entrevista.sql.

---

## Instalación de PostgreSQL.

### Windows

1. Descargar desde: https://www.postgresql.org/download/windows/
2. Ejecutar el instalador:
   - Seleccionar todo por defecto.
   - Establecer contraseña para el usuario `postgres`(usuario por defecto).
   - Usar el puerto por defecto: `5432`.
   - Finalizar la instalación.

### Verificar instalacion, en nuesto terminal ponemos el siguiente comando.

```bash
psql --version
```

Si se instalo correctamente deberia salir la version instalada de postgres, en mi caso: 

### psql (PostgreSQL) 17.5

### Importar base de datos.

en la terminal pondremos el siguiente comando, remplazar los datos por los verdaderos.

```bash
psql -U postgres -d nombre_basedatos -f ./entrevista/entrevista.sql
```
### verificamos la importación.

para saber que efectivamente se importo la base de datos correctamente vamos a poner el siguiente comando en la terminal.

```bash
psql -U postgres -d peliculas
```

### ingrese la contraseña establecida anteriormente, si todos los datos son correctos deberia de salir algo como:

```bash
peliculas=#
```

### para ver los campos de la tabla, escribimos: 

```bash
peliculas=# \dt
```

### Ya podemos ingresar sentencias SQL para interactuar con la base de datos.

---

### 1. Clonar el Repositorio

Descargamos el .zip del proyecto o directamente pegamos el link de clonaciónn del repositorio en nuestra terminal de GIT BASH.

### 2. Variables de Entorno. Crea un archivo .env en la raíz de la carpeta backend con los siguienetes campos, adapta los valores a los verdaderos.

#### Backend (`/backend/.env`)

```env
DB_HOST=localhost // se deja igual si se instalo con los datos por defecto de postgreSQL
DB_PORT=5432  // se deja igual si se instalo con los datos por defecto de postgreSQL
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=peliculas // se deja igual
JWT_SECRET=clave_segura
OMDB_API_URL=http://www.omdbapi.com // se deja igual 
OMDB_API_KEY=tu_key_de_omdb
```

### 3. Despues de tener todo listo, en la terminal de visual studio code ponemos los siguientess comandos uno por uno. 

### Backend

```bash
cd backend
npm install
npm run start:dev
```

###  Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### YA EL PROYECTO DEBERIA DE ESTAR CORRIENDO SIN FALLAS.

---
## Funcionalidades Principales

### Autenticación

* Registro e inicio de sesión con email y contraseña.
* Manejo de sesión mediante cookies HttpOnly y JWT.

### Películas

* Búsqueda de películas por título usando la API de OMDb.
* Mostrar resultados con imagen y datos.

### Favoritos

* Guardar una película como favorita.
* Listado de películas favoritas del usuario autenticado.
* Calificar (1-5 estrellas) y comentar cada película favorita.

---

## Endpoints Destacados (Backend NestJS)

### Autenticación

* `POST /auth/register` — Registro de usuario.
* `POST /auth/login` — Login con email y password.
* `GET /auth/me` — Obtener usuario autenticado.

### Películas

* `GET /peliculas?q=nombre` — Buscar películas (usa OMDb).

### Favoritos

* `POST /favoritos` — Guardar película como favorita.
* `GET /favoritos` — Listar favoritos del usuario autenticado.
* `PATCH /favoritos/:id/comentario` — Agregar comentario y calificación.

---

## Modelo de Datos

### Usuario

* id
* name
* email
* password (hasheada)

### Favorito

* id
* imdbID
* title
* year
* poster
* comentario (opcional)
* calificacion (opcional)
* userId (relación con Usuario)

---

## Diseño

* Se usa `HttpOnly Cookie` para el token JWT por seguridad contra ataques XSS.
* Los favoritos están vinculados al usuario mediante una relación TypeORM.
* El backend actúa como "proxy" hacia OMDb para evitar exponer la API key.

---

## Consideraciones

* La calificación es un número entre 1 y 5, y se guarda en el mismo modelo de favorito para simplificar.
* Comentarios simples, solo texto.

---

## para escalar 

(En proceso) integrar un microservicio en **FastAPI** para análisis de sentimientos de los comentarios de usuarios.


## Autor

**Juan José Giraldo Patiño**
[LinkedIn](www.linkedin.com/in/juan-jose-giraldo-patiño-dev-web)

