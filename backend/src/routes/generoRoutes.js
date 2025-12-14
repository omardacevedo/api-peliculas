import { Router } from "express";
const router= Router(); // Crear la instancia  de router

import {
    crearGenero,
    obtenerGeneros,
    obtenerGenero,
    actualizarGenero,
    eliminarGenero
}from "../controllers/generoController.js";

// Importar los middlewares de seguridad

import auth from '../middlewares/auth.js';
import checkRole from '../middlewares/role.js';

//Definir el middleware solo administrador

const soloAdmin = checkRole(['administrador']);


//Rutas:


//1. Rutas de lectura GET
router.get("/",auth, obtenerGeneros);
router.get("/:id",auth, obtenerGenero);


//2. Rutas de Escritura (POST, PUT,DELETE) aplicando solo admin para comparar rol de administrador

router.post("/",auth,soloAdmin, crearGenero);
router.put("/:id",auth,soloAdmin, actualizarGenero);
router.delete("/:id",auth,soloAdmin, eliminarGenero);


export default router;