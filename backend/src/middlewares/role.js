// La función checkRole toma un array de roles permitidos 
const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        // req.usuario es agregado por el middleware 'auth'
        
        // 1. Verificar si la autenticación se realizó
        if (!req.usuario || !req.usuario.rol) {
            // Esto solo debería ocurrir si 'auth' no se ejecutó primero, 
            return res.status(403).json({ 
                mensaje: 'Acceso denegado. No se encontró información de rol.' 
            });
        }
        
        // 2. Verificar si el rol del usuario está incluido en la lista de roles permitidos
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                mensaje: 'Acceso denegado. Rol insuficiente para esta acción.' 
            });
        }
        
        // El usuario tiene el rol requerido, continuar
        next();
    };
};

export default checkRole;