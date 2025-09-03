import express from "express";

import {
    crearProductora,
    obtenerProductoras,
    obtenerProductora,
    actualizarProductora,
    eliminarProductora
}from "../controllers/productoraController.js";

const router = express.Router();

router.post("/", crearProductora);
router.get("/", obtenerProductoras);
router.get("/:id", obtenerProductora);
router.put("/:id", actualizarProductora);
router.delete("/:id",eliminarProductora);


export default router;