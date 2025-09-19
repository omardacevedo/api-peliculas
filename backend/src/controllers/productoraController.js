import Productora from "../models/Productora.js";

//crear un productora

export const crearProductora = async (req, res) =>{
    try{
        const nuevaProductora  = new Productora (req.body);
        await nuevaProductora.save();
        res.status(201).json(nuevaProductora);
    }catch (error) {
        res.status(400).json({error:error.message});
    }
};

//Obtener todos las productora

export const obtenerProductoras = async(req, res)=>{
    try{
        const productoras = await Productora.find();
        res.json(productoras);
    }catch (error){
        res.status(500).json({error:error.message});
    }
};

//Obtener una productora por Id

export const obtenerProductora = async(req, res)=>{
    try{
        const productora = await Productora.findById(req.params.id);
        if(!productora) return res.status(404).json({error:"Productora no encontrada"});
        res.json(productora);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Actualizar  productora
export const actualizarProductora = async(req, res)=>{
    try{
        const productora =await Productora.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new :true()}
        );
        if(!productora) return res.status(404).json({error: "Productora no encontrada"});
        res.json(productora);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

//Eliminar una productora

export const eliminarProductora = async (req, res)=>{
    try{
        const productora = await Productora.findByIdAndDelete(req.params.id);
        if(!productora) return res.status(404).json({error: "Productora no encontrada"});
        res.json({mensaje: "Productora eliminada correctamente "});
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};
