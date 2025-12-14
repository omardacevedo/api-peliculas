import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // Para acceder a process.env.JWT_SECRET

/**
 * Registra un nuevo usuario, hasheando la contraseña.
 */
const crearUsuario = async (req, res) => {
    try {
        const { 
            nombre, 
            email, 
            password, 
            rol = 'visualizador' 
        } = req.body;

        // 1. Validar que el usuario no exista
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya existe con ese correo.' });
        }

        // 2. Crear nueva instancia
        usuario = new Usuario({ nombre, email, password, rol });
        
        // 3. Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt); // 

        // 4. Guardar en DB
        await usuario.save();
        
        // Excluir la contraseña en la respuesta
        res.status(201).json({ 
            _id: usuario._id, 
            nombre: usuario.nombre, 
            email: usuario.email, 
            rol: usuario.rol 
        });

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al registrar.' });
    }
};

/**
 * Autentica un usuario, verifica la contraseña y genera un JWT.
 */
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario por email
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        // 2. Comparar la contraseña hasheada
        const esPasswordValido = bcrypt.compareSync(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        // 3. Generar JWT (Incluir ID y ROL en el payload)
        const payload = { 
            usuario: { 
                id: usuario._id,
                rol: usuario.rol // CLAVE: Adjuntar el rol al token
            } 
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Usar variable de entorno o 1 hora
        ); // 

        // 4. Devolver el token y el rol
        res.json({ 
            token,
            rol: usuario.rol 
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al iniciar sesión.' });
    }
};

export {
    crearUsuario,
    loginUsuario
};