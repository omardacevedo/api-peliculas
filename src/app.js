import express from "express";
import cors from "cors";
import morgan from "morgan";
import generoRoutes from "./routes/generoRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import productoraRoutes from "./routes/productoraRoutes.js";
import tipoRoutes from "./routes/tipoRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//Rutas
app.use("/api/generos", generoRoutes);
app.use("/api/directores", directorRoutes);
app.use("/api/productoras", productoraRoutes);
app.use("/api/tipos", tipoRoutes);
app.use("/api/medias", mediaRoutes);



// Ruta de prueba
app.get("/api/health", (req, res) => res.json({ status: "ok" }));


export default app;
