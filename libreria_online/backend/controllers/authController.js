// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lógica para registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        //  Verificar si el correo ya está registrado
        const usuarioExiste = await User.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Crear el nuevo usuario (la contraseña se encripta automáticamente gracias al middleware del modelo)
        const nuevoUsuario = new User({
            nombre,
            correo,
            password,
            rol // Mongoose asignará 'cliente' por defecto si viene vacío
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor al registrar', error: error.message });
    }
};

// Lógica para iniciar sesión (Login)
const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Buscar al usuario por su correo
        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Si todo es correcto, generar el Token JWT con los datos esenciales (id y rol)
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // El token será válido por 7 días
        );

        // Responder a React con el token y los datos del usuario
        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión', error: error.message });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};