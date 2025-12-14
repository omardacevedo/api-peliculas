import jwt from 'jsonwebtoken';
import 'dotenv/config'; // Asegúrate de que .env esté cargado

const auth = (req, res, next) => {
    // 1. Obtener el header de autorización
    const authHeader = req.header('Authorization');

    // Verificar si el header existe
    if (!authHeader) {
        return res.status(401).json({ 
            mensaje: 'Acceso denegado. Token no proporcionado.' 
        });
    }

    // 2. Extraer el token (eliminar "Bearer ")
    const tokenParts = authHeader.split(' ');
    
    // Verificar formato "Bearer [token]"
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ 
            mensaje: 'Formato de token inválido. Use el formato: Bearer [token].' 
        });
    }

    const tokenPuro = tokenParts[1];

    try {
        // 3. Verificar y decodificar el token usando la clave secreta
        const cifrado = jwt.verify(tokenPuro, process.env.JWT_SECRET);
        
        // 4. Adjuntar la información del usuario al objeto request
        req.usuario = cifrado.usuario;
        
        next();
    } catch (error) {
        // Si la verificación falla (token expirado, inválido, etc.)
        res.status(401).json({ 
            mensaje: 'Token no válido o expirado.' 
        });
    }
};

export default auth;