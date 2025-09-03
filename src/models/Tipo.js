import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    },
    fechaActualizacion:{
        type: String,
        default:Date.now
    },
    descripcion:{
        type:String,
    }
});

//Antes de guardar, actualiza Fecha ACtualizacion

tipoSchema.pre("save",function(next){
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Tipo", tipoSchema);