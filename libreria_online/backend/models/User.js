// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    rol: { 
        type: String, 
        enum: ['cliente', 'admin'], // Solo acepta estos dos valores
        default: 'cliente'          // Por defecto, cualquier registro nuevo es cliente
    }
}, { 
    timestamps: true // Crea automáticamente los campos createdAt y updatedAt
});

// Middleware de Mongoose: Encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function() {
    // Si la contraseña no ha sido modificada, terminamos la ejecución de esta función
    if (!this.isModified('password')) return;
    
    // Generamos el salt y encriptamos
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);