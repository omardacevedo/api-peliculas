// Importaciones ES Modules
import { Router } from 'express';
const router = Router();



import {
    crearDirector,
    obtenerDirectores,
    obtenerDirector,
    actualizarDirector,
    eliminarDirector
} from '../controllers/directorController.js';

import auth from '../middlewares/auth.js'; 
import checkRole from '../middlewares/role.js';

const soloAdmin = checkRole(['administrador']);

// --- Definición de Rutas ---

// RUTAS DE LECTURA (GET): Requiere Autenticación
router.get('/', auth, obtenerDirectores);
router.get('/:id', auth, obtenerDirector);

// RUTAS DE ESCRITURA (POST, PUT, DELETE): Requiere Autenticación Y Rol de Administrador
router.post('/', auth, soloAdmin, crearDirector);
router.put('/:id', auth, soloAdmin, actualizarDirector);
router.delete('/:id', auth, soloAdmin, eliminarDirector);

// Exportación correcta de ES Modules (para ser consumida por app.js)
export default router;