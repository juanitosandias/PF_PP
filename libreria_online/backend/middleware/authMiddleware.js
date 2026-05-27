// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar que el usuario está logueado
const protect = async (req, res, next) => {
    let token;

    // Verificamos si la petición envía un token de autorización en los Headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraemos el token (el formato es "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Decodificamos el token usando nuestra clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos al usuario en la BD por el ID del token y lo guardamos en la request (req)
            // Usamos .select('-password') para no traer la contraseña encriptada por seguridad
            req.user = await User.findById(decoded.id).select('-password');

            next(); // El token es válido, pasamos al siguiente controlador
        } catch (error) {
            res.status(401).json({ mensaje: 'No autorizado, token fallido o expirado' });
        }
    }

    if (!token) {
        res.status(401).json({ mensaje: 'No autorizado, no hay token' });
    }
};

// Middleware para verificar que el usuario sea administrador
const admin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next(); // Es admin, lo dejamos pasar
    } else {
        res.status(403).json({ mensaje: 'Acceso denegado: solo para administradores' });
    }
};

module.exports = { protect, admin };