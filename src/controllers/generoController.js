import Genero from "../models/Genero.js";

//crear un genero

export const crearGenero = async (req, res) =>{
    try{
        const genero = new Genero (req.body);
        await genero.save();
        res.status(201).json(genero);
    }catch (error) {
        res.status(400).json({error:error.message});
    }
};

//Obtener todos los generos

export const obtenerGeneros = async(req, res)=>{
    try{
        const generos = await Genero.find();
        res.json(generos);
    }catch (error){
        res.status(500).json({error:error.message});
    }
};

//Obtener un genero por Id

export const obtenerGenero = async(req, res)=>{
    try{
        console.log("ID recibido:", req.params.id);
        const genero = await Genero.findById(req.params.id);
        console.log("Resultado MongoDB:", genero);
        if(!genero) return res.status(404).json({error:"Género no encontrado"});
        res.json(genero);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Actualizar  Genero
export const actualizarGenero = async(req, res)=>{
    try{
        const genero =await Genero.findByIdAndUpdate(
            req.params.id,
            {...req.body, fechaActualizacion: new Date()},
            {new: true}
        );
        if(!genero) return res.status(404).json({error: "Género no encontrado"});
        res.json(genero);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

//Eliminar un genero

export const eliminarGenero = async (req, res)=>{
    try{
        const genero =await Genero.findByIdAndDelete(req.params.id);
        if(!genero) return res.status(404).json({error: "Género no encontrado"});
        res.json({mensaje: "Género eliminado correctamente "});
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};
