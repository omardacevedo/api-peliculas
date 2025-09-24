import mongoose from "mongoose";

const generoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    estado:{
        type:String,
        enum:["Activo", "Inactivo"],
        default: "Activo",
        required:true
    },
    descripcion:{
        type:String,
        default: ""
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    },
    fechaActualizacion:{
        type: String,
        default:Date.now
    }
});

//Antes de guardar, actualiza Fecha ACtualizacion

generoSchema.pre("save",function(next){
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Genero", generoSchema, "generos");