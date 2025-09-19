import express from "express";

import {
    crearDirector,
    obtenerDirectores,
    obtenerDirector,
    actualizarDirector,
    eliminarDirector
}from "../controllers/directorController.js";

const router = express.Router();

router.post("/", crearDirector);
router.get("/", obtenerDirectores);
router.get("/:id", obtenerDirector);
router.put("/:id", actualizarDirector);
router.delete("/:id",eliminarDirector);


export default router;