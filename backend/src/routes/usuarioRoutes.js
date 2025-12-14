import { Router } from "express";
const router = Router(); 

import { crearUsuario, loginUsuario } from '../controllers/usuarioController.js';

/**
 * @route POST /api/auth/registro
 * @desc Crea un nuevo usuario. Pública.
 */
router.post('/registro', crearUsuario);

/**
 * @route POST /api/auth/login
 * @desc Autentica un usuario y devuelve un JWT. Pública.
 */
router.post('/login', loginUsuario);

export default router;