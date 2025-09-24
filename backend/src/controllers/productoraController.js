import Productora from "../models/Productora.js";

// Crear Productora
export const crearProductora = async (req, res) => {
      console.log("Datos recibidos:", req.body); // <--- VERIFICAR QUE LLEGA JSON

    try {
        const { nombre, slogan, descripcion, estado } = req.body;

        // Validación básica
        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Nombre y descripción son obligatorios." });
        }

        const nuevaProductora = new Productora({
            nombre,
            slogan: slogan || "",
            descripcion,
            estado: estado || "Activo"
        });

        const savedProductora = await nuevaProductora.save();
        res.status(201).json(savedProductora);

    } catch (error) {
        console.error("Error al crear productora:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener todas las productoras
export const obtenerProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener productora por ID
export const obtenerProductora = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) return res.status(404).json({ message: "Productora no encontrada" });
        res.json(productora);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Actualizar productora
export const actualizarProductora = async (req, res) => {
    try {
        const { nombre, slogan, descripcion, estado } = req.body;

        const updatedProductora = await Productora.findByIdAndUpdate(
            req.params.id,
            { nombre, slogan, descripcion, estado, fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedProductora) return res.status(404).json({ message: "Productora no encontrada" });
        res.json(updatedProductora);

    } catch (error) {
        console.error("Error al actualizar productora:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Eliminar productora
export const eliminarProductora = async (req, res) => {
    try {
        const deleted = await Productora.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Productora no encontrada" });
        res.json({ message: "Productora eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
