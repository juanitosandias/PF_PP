// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
// Importamos la nueva función
const { crearPedido, obtenerTodosLosPedidos, obtenerMisPedidos } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Crear pedido (Cualquier usuario logueado)
router.post('/', protect, crearPedido);

// Ver mis pedidos (Cualquier usuario logueado)
router.get('/mis-pedidos', protect, obtenerMisPedidos);

// Ver todos los pedidos (Solo administradores)
router.get('/', protect, admin, obtenerTodosLosPedidos);

module.exports = router;