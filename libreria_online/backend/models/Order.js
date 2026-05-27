// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Relacionamos el pedido con el usuario que lo hizo
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Guardamos un arreglo con los libros exactos que compró
    articulos: [
        {
            libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
            titulo: { type: String, required: true },
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true }
        }
    ],
    total: { 
        type: Number, 
        required: true 
    },
    estado: { 
        type: String, 
        default: 'completado' // Podría ser 'pendiente' si implementaras pasarelas de pago reales
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);