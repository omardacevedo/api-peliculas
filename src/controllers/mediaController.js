import Media from "../models/Media.js";

// Crear Media
export const crearMedia = async (req, res) => {
    try {
        const nuevaMedia = new Media(req.body);
        await nuevaMedia.save();
        res.status(201).json(nuevaMedia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las medias
export const obtenerMedias = async (req, res) => {
    try {
        const medias = await Media.find()
            .populate("genero", "nombre")
            .populate("director", "nombres")
            .populate("productora", "nombre")
            .populate("tipo", "nombre");
        res.json(medias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener media por ID
export const obtenerMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id)
            .populate("genero", "nombre")
            .populate("director", "nombres")
            .populate("productora", "nombre slogan")
            .populate("tipo", "nombre descripcion");
        if (!media) return res.status(404).json({ error: "Media no encontrada" });
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar media
export const actualizarMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!media) return res.status(404).json({ error: "Media no encontrada" });
        res.json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar media
export const eliminarMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) return res.status(404).json({ error: "Media no encontrada" });
        res.json({ message: "Media eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
