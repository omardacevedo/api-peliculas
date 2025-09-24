import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    serial:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    titulo:{
        type:String,
        trim: true,
        require:true
    },
    sipnosis:{
        type:String,
        trim:true
    },
    url:{
        type: String,
        require:true,
        unique:true
    },
    imagen:{
        type:String,
        trim: true
    },
    fechaCreacion:{
        type: Date,
        default: Date.now
    },
    fechaActualizacion:{
        type:Date,
        default:Date.now
    },
    anioEstreno:{
        type: Number,
        require:true
    },
    genero:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genero",
        require:true
    },
    director:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Director",
        require:true
    },
    productora:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Productora",
        require:true
    },
    tipo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tipo",
        require:true
    },
});

// Middleware para actualizar fechaActualizacion

mediaSchema.pre("save",function(next){
    this.fechaActualizacion = new Date();
    next();
});

export default mongoose.model("Media", mediaSchema);