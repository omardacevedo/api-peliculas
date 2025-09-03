import express from "express";

import {
    crearMedia,
    obtenerMedias,
    obtenerMedia,
    actualizarMedia,
    eliminarMedia
}from "../controllers/mediaController.js";

const router = express.Router();

router.post("/", crearMedia);
router.get("/", obtenerMedias);
router.get("/:id", obtenerMedia);
router.put("/:id", actualizarMedia);
router.delete("/:id",eliminarMedia);


export default router;