import Tipo from "../models/Tipo.js";

//crear un Tipo

export const crearTipo = async (req, res) =>{
    try{
        const tipo = new Tipo (req.body);
        await tipo.save();
        res.status(201).json(tipo);
    }catch (error) {
        res.status(400).json({error:error.message});
    }
};

//Obtener todos los tipos

export const obtenerTipos = async(req, res)=>{
    try{
        const tipos = await Tipo.find();
        res.json(tipos);
    }catch (error){
        res.status(500).json({error:error.message});
    }
};

//Obtener un tipo por Id

export const obtenerTipo = async(req, res)=>{
    try{
        console.log("ID recibido:", req.params.id);
        const tipo = await Tipo.findById(req.params.id);
        console.log("Resultado MongoDB:", tipo);
        if(!Tipo) return res.status(404).json({error:"Tipo no encontrado"});
        res.json(genero);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Actualizar  tipo
export const actualizarTipo = async(req, res)=>{
    try{
        const tipo =await Tipo.findByIdAndUpdate(
            req.params.id,
            {...req.body, fechaActualizacion: new Date()},
            {new: true}
        );
        if(!tipo) return res.status(404).json({error: "Tipo no encontrado"});
        res.json(tipo);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

//Eliminar un Tipo

export const eliminarTipo = async (req, res)=>{
    try{
        const tipo =await Tipo.findByIdAndDelete(req.params.id);
        if(!tipo) return res.status(404).json({error: "Tipo no encontrado"});
        res.json({mensaje: "Tipo eliminado correctamente "});
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};
