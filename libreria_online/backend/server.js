// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db.js');

const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// --- REGISTRO DE RUTAS ---
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/books', require('./routes/bookRoutes.js'));
app.use('/api/orders', require('./routes/orderRoutes.js'));

// Ruta base de prueba
app.get('/api', (req, res) => {
    res.json({ mensaje: "API de la librería funcionando correctamente" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});