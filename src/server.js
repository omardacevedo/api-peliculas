import dotenv from "dotenv";
import app from "./app.js"; // ← asegúrate que la ruta sea correcta
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`)))
  .catch(err => {
    console.error("❌ Error al conectar a la BD", err);
    process.exit(1);
  });
