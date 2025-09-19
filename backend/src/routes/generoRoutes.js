import express from "express";

import {
    crearGenero,
    obtenerGeneros,
    obtenerGenero,
    actualizarGenero,
    eliminarGenero
}from "../controllers/generoController.js";

const router = express.Router();

router.post("/", crearGenero);
router.get("/", obtenerGeneros);
router.get("/:id", obtenerGenero);
router.put("/:id", actualizarGenero);
router.delete("/:id",eliminarGenero);


export default router;