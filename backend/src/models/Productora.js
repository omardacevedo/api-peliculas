import mongoose from "mongoose";

const productoraSchema = new mongoose.Schema({
    nombres:{
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
    },
    slogan:{
        type:String,
        trim: true
    },
    descripcion:{
        type: String,
        require:true
    }
});

// Middleware para actualizar fechaActualizacion

productoraSchema.pre("save",function(next){
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Productora", productoraSchema);