import express from "express";

import {
    crearTipo,
    obtenerTipos,
    obtenerTipo,
    actualizarTipo,
    eliminarTipo
}from "../controllers/tipoController.js";

const router = express.Router();

router.post("/", crearTipo);
router.get("/", obtenerTipos);
router.get("/:id", obtenerTipo);
router.put("/:id", actualizarTipo);
router.delete("/:id",eliminarTipo);


export default router;