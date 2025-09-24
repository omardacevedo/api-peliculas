import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    categoria: {
        type: String,
        enum: ["Serie", "Película"],
        required: true
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: String,
        default: Date.now
    },
});

//Antes de guardar, actualiza Fecha ACtualizacion

tipoSchema.pre("save", function (next) {
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Tipo", tipoSchema);