import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    estado:{
        type:String,
        enum:["Activo", "Inactivo"],
        default: "Activo"
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    },
    fechaActualizacion:{
        type: Date,
        default:Date.now
    }
});

//Antes de guardar, actualiza Fecha ACtualizacion

directorSchema.pre("save",function(next){
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Director", directorSchema);