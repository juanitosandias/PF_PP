// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    autor: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    imagenUrl: { 
        type: String 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Book', bookSchema);