// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { 
    obtenerLibros, 
    obtenerLibroPorId, 
    crearLibro, 
    actualizarLibro, 
    eliminarLibro 
} = require('../controllers/bookController');

// Importamos nuestros middlewares de seguridad
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas públicas (cualquiera puede ver el catálogo)
router.get('/', obtenerLibros);
router.get('/:id', obtenerLibroPorId);

// Rutas protegidas (Requieren estar logueado y ser 'admin')
router.post('/', protect, admin, crearLibro);
router.put('/:id', protect, admin, actualizarLibro);
router.delete('/:id', protect, admin, eliminarLibro);

module.exports = router;