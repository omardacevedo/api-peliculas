import Director from "../models/Director.js";

//crear un Director

export const crearDirector = async (req, res) =>{
    try{
        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    }catch (error) {
        res.status(400).json({error:error.message});
    }
};

//Obtener todos los directores

export const obtenerDirectores = async(req, res)=>{
    try{
        const directores = await Director.find();
        res.json(directores);
    }catch (error){
        res.status(500).json({error:error.message});
    }
};

//Obtener un director por Id

export const obtenerDirector = async(req, res)=>{
    try{
        const director = await Director.findById(req.params.id);
        console.log("Resultado MongoDB:", director);
        if(!director) return res.status(404).json({error:"director no encontrado"});
        res.json(director);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Actualizar director
export const actualizarDirector = async(req, res)=>{
    try{
        const director =await Director.findByIdAndUpdate(
            req.params.id,
            {...req.body, fechaActualizacion: new Date()},
            {new: true}
        );
        if(!director) return res.status(404).json({error: "director no encontrado"});
        res.json(director);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

//Eliminar un director

export const eliminarDirector = async (req, res)=>{
    try{
        const director =await Director.findByIdAndDelete(req.params.id);
        if(!director) return res.status(404).json({error: "director no encontrado"});
        res.json({mensaje: "director eliminado correctamente "});
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};
