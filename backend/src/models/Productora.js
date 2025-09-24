import mongoose from "mongoose";

const productoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
        trim: true
    },
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },

    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
});

// Middleware para actualizar fechaActualizacion

productoraSchema.pre("save", function (next) {
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Productora", productoraSchema);