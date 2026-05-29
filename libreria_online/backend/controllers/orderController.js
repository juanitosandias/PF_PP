// backend/controllers/orderController.js
const Order = require('../models/Order');

//  POST: Crear un nuevo pedido
const crearPedido = async (req, res) => {
    try {
        const { articulos, total } = req.body;
        if (!articulos || articulos.length === 0) {
            return res.status(400).json({ mensaje: 'No hay artículos en el pedido' });
        }

        const nuevoPedido = new Order({
            usuario: req.user._id,
            articulos,
            total
        });

        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json({ mensaje: 'Pedido procesado con éxito', pedido: pedidoGuardado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar el pedido', error: error.message });
    }
};

//  GET: Obtener los pedidos del usuario actual (Cliente)
const obtenerMisPedidos = async (req, res) => {
    try {
        // Buscamos solo los pedidos donde el campo 'usuario' coincida con el ID del token
        // .sort({ createdAt: -1 }) ordena para mostrar los más recientes primero
        const pedidos = await Order.find({ usuario: req.user._id }).sort({ createdAt: -1 });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tus pedidos', error: error.message });
    }
};

//  GET: Obtener todos los pedidos (Solo Admin)
const obtenerTodosLosPedidos = async (req, res) => {
    try {
        const pedidos = await Order.find().populate('usuario', 'nombre correo');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
    }
};


module.exports = { crearPedido, obtenerMisPedidos, obtenerTodosLosPedidos };