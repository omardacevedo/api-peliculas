# API de Películas - Universidad Digital de Antioquia

Esta es una **API REST** desarrollada con **Node.js, Express y MongoDB Atlas** para la gestión de películas y series.
Incluye los módulos: **Género, Director, Productora, Tipo y Media** (Películas y Series).

La API permite crear, consultar, actualizar y eliminar registros, pensado como backend de una aplicación web de entretenimiento académica.

---

## 🔧 Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* CORS
* Morgan
* Nodemon (desarrollo)

---

## 📂 Estructura del proyecto

```
api-peliculas/
│── src/
│   ├── controllers/
│   │   ├── generoController.js
│   │   ├── directorController.js
│   │   ├── productoraController.js
│   │   ├── tipoController.js
│   │   └── mediaController.js
│   ├── models/
│   │   ├── Genero.js
│   │   ├── Director.js
│   │   ├── Productora.js
│   │   ├── Tipo.js
│   │   └── Media.js
│   ├── routes/
│   │   ├── generoRoutes.js
│   │   ├── directorRoutes.js
│   │   ├── productoraRoutes.js
│   │   ├── tipoRoutes.js
│   │   └── mediaRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── app.js
│   └── server.js
│── .env
│── .gitignore
│── package.json
```

---

## ⚙️ Configuración del entorno

Sigue estos pasos para levantar la API en tu máquina local:

1. **Clonar el repositorio**

```bash
git clone https://github.com/omardacevedo/api-peliculas.git
cd api-peliculas
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear archivo `.env`** en la raíz del proyecto con las siguientes variables:

```
PORT=3000
MONGO_URI=<TU_URI_DE_MONGO_ATLAS>
```

> Reemplaza `<TU_URI_DE_MONGO_ATLAS>` con la conexión de tu cluster en MongoDB Atlas.

4. **Levantar el servidor en modo desarrollo**

```bash
npm run dev
```

* La API se ejecutará en: `http://localhost:3000`
* Endpoint de prueba: `GET /api/health` → `{"status":"ok"}`

---

## 📌 Endpoints principales

### Módulo Género

* `GET /api/generos` → Listar todos
* `GET /api/generos/:id` → Obtener por ID
* `POST /api/generos` → Crear
* `PUT /api/generos/:id` → Actualizar
* `DELETE /api/generos/:id` → Eliminar

### Módulo Director

* `GET /api/directores`
* `GET /api/directores/:id`
* `POST /api/directores`
* `PUT /api/directores/:id`
* `DELETE /api/directores/:id`

### Módulo Productora

* `GET /api/productoras`
* `GET /api/productoras/:id`
* `POST /api/productoras`
* `PUT /api/productoras/:id`
* `DELETE /api/productoras/:id`

### Módulo Tipo

* `GET /api/tipos`
* `GET /api/tipos/:id`
* `POST /api/tipos`
* `PUT /api/tipos/:id`
* `DELETE /api/tipos/:id`

### Módulo Media (Películas y Series)

* `GET /api/medias`
* `GET /api/medias/:id`
* `POST /api/medias`
* `PUT /api/medias/:id`
* `DELETE /api/medias/:id`

> Los endpoints de creación o actualización esperan **JSON válido** sin `_id`, `fechaCreacion` ni `fechaActualizacion`.

---

## 📬 Pruebas con Postman

Para crear una **Media** correctamente:

1. Crear primero un **Género**, **Director**, **Productora** y **Tipo** → obtener `_id` de cada uno.
2. Crear la Media usando esos `_id` en el body de `POST /api/medias`.

**Ejemplo de body para Media:**

```json
{
  "serial": "MOV001",
  "titulo": "Pulp Fiction",
  "sinopsis": "Dos asesinos a sueldo con humor negro",
  "url": "https://pulpfiction.com",
  "imagen": "https://imagenes.com/pulpfiction.jpg",
  "anioEstreno": 1994,
  "genero": "ID_GENERO",
  "director": "ID_DIRECTOR",
  "productora": "ID_PRODUCTORA",
  "tipo": "ID_TIPO"
}
```

> Reemplaza los `ID_...` con los `_id` reales de MongoDB.

---

## ⚠️ Notas importantes

* `.env` y `node_modules/` están en `.gitignore` y no se suben al repo.
* Esta API está en fase de desarrollo, sin autenticación ni seguridad.
* MongoDB genera automáticamente `_id`, `fechaCreacion` y `fechaActualizacion`.

---

## 📝 Autores

* Universidad Digital de Antioquia
* Omar Danilo Acevedo Rojas
* Luis Felipe Buitrago Rivera
