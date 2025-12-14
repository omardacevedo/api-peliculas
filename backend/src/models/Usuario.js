import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
    nombre: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    // El campo 'rol' es fundamental para la autorización
    rol: { 
        type: String, 
        required: true, 
        enum: ['administrador', 'visualizador'], 
        default: 'visualizador' // Rol por defecto si no se especifica
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now },
    fechaActualizacion: { 
        type: Date, 
        default: Date.now }
});

export default model('Usuario', UsuarioSchema);