import { Router } from 'express';
const router = Router(); 

// 2. Importar todas las funciones del controlador individualmente (asumo exportaciones nombradas)
import {
    crearProductora,
    obtenerProductoras,
    obtenerProductora, 
    actualizarProductora,
    eliminarProductora
} from '../controllers/productoraController.js'; 

// 3. Importar los middlewares (asumo exportaciones por defecto, como hicimos antes)
import auth from '../middlewares/auth.js'; 
import checkRole from '../middlewares/role.js';

const soloAdmin = checkRole(['administrador']);

// --- Rutas ---

// Rutas de Lectura (GET)
router.get('/', auth, obtenerProductoras); 
router.get('/:id', auth, obtenerProductora); 

// Rutas de Escritura (POST, PUT, DELETE)
router.post('/', auth, soloAdmin, crearProductora);
router.put('/:id', auth, soloAdmin, actualizarProductora);
router.delete('/:id', auth, soloAdmin, eliminarProductora);

// 4. Asegurar la exportación por defecto (la que arregló el problema anterior en app.js)
export default router;