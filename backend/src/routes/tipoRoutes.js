import express from "express";
import { Router } from "express";

const router = Router();
import {
    crearTipo,
    obtenerTipos,
    obtenerTipo,
    actualizarTipo,
    eliminarTipo
}from "../controllers/tipoController.js";

//Importar los middleware de seguridad

import auth from  '../middlewares/auth.js';
import checkRole from '../middlewares/role.js';

//Definir middleware solo administrador

const soloAdmin = checkRole(['administrador']);

//Rutas

//1. Rutas de lectura Get, solo requieren autenticacion
router.get("/",auth, obtenerTipos);
router.get("/:id",auth, obtenerTipo);


//2. Rutas de escritura (POST,PUT,DELETE)
router.post("/",auth,soloAdmin, crearTipo);
router.put("/:id",auth,soloAdmin, actualizarTipo);
router.delete("/:id",auth,soloAdmin, eliminarTipo);


export default router;