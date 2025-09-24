import express from "express";
import helmet from "helmet";
import compression from "compression";
import createError from "http-errors";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";


const app = express();


// Resolver rutas en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar archivo openapi.yaml
const swaggerDocument = YAML.load(path.join(__dirname, "../openapi.yaml"));

// Middleware para Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Rutas
import generoRoutes from "./routes/generoRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import productoraRoutes from "./routes/productoraRoutes.js";
import tipoRoutes from "./routes/tipoRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";


// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//  Rutas
app.use("/api/generos", generoRoutes);
app.use("/api/directores", directorRoutes);
app.use("/api/productoras", productoraRoutes);
app.use("/api/tipos", tipoRoutes);
app.use("/api/medias", mediaRoutes);

// Ruta de prueba
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Middleware para manejar 404 (si ninguna ruta anterior coincide)
app.use((req, res, next) => {
  next(createError(404, "Ruta no encontrada"));
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Error interno del servidor",
    },
  });
});

export default app;
