// backend/config/db.js
const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error.message}`);
        process.exit(1); // Detiene el servidor si la conexión falla
    }
};

module.exports = conectarDB;