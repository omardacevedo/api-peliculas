import { Router } from "express"; // Importa Router
const router = Router(); // Crea la instancia del router (usando Router de express)

// Importa las funciones del controlador
import {
    crearMedia,
    obtenerMedias,
    obtenerMedia,
    actualizarMedia,
    eliminarMedia
} from "../controllers/mediaController.js";

// Importa los middlewares de seguridad
import auth from '../middlewares/auth.js'; // Asumiendo que auth.js usa 'export default'
import checkRole from '../middlewares/role.js'; // Asumiendo que role.js usa 'export default'

// Define el middleware de solo Administrador
const soloAdmin = checkRole(['administrador']);

// 1. RUTAS DE LECTURA (GET): 
router.get("/", obtenerMedias);
router.get("/:id", obtenerMedia);

// 2. RUTAS DE ESCRITURA (POST, PUT, DELETE): Requiere Autenticación Y Rol de Administrador
router.post("/",   crearMedia);
router.put("/:id", auth, soloAdmin, actualizarMedia);
router.delete("/:id", auth, soloAdmin, eliminarMedia);


export default router;