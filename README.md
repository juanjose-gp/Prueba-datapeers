# Proyecto: Plataforma de Películas.

Aplicación Fullstack desarrollada con **NestJS** (backend) y **React** (frontend) que permite a los usuarios autenticarse, buscar películas desde la API de OMDb, guardar sus favoritas, y calificarlas/comentarlas.

---

## Tecnologías Utilizadas

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

## Instalación del proyecto

### 1. Clonar el Repositorio

Descargamos el .zip delproyecto o directamente pegamos el link de clonacion del repositorio en nuestra terminal de GIT BASH

### 2. Variables de Entorno

#### Backend (`/backend/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=peliculas
JWT_SECRET=clave_segura
OMDB_API_URL=http://www.omdbapi.com
OMDB_API_KEY=tu_key_de_omdb
```

### 3. Backend

```bash
cd backend
npm install
npm run start:dev
```



### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

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

## Atajos y Consideraciones

* Se usa `synchronize: true` temporalmente para desarrollo y que se hagan las migraciones necesarias automaticamente.
* La calificación es un número entre 1 y 5, y se guarda en el mismo modelo de favorito para simplificar.
* Comentarios simples, solo texto.

---

## Opcional

(En proceso) integrar un microservicio en **FastAPI** para análisis de sentimientos de los comentarios de usuarios.


## Autor

**Juan José Giraldo Patiño**
[LinkedIn](www.linkedin.com/in/juan-jose-giraldo-patiño-dev-web)

