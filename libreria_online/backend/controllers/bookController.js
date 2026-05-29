// backend/controllers/bookController.js
const Book = require('../models/Book');

// GET: Obtener todos los libros
const obtenerLibros = async (req, res) => {
    try {
        const libros = await Book.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los libros', error: error.message });
    }
};

// GET: Obtener un solo libro por su ID 
const obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Book.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el libro', error: error.message });
    }
};

// POST: Agregar un nuevo libro (solo para Admin)
const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, descripcion, precio, stock, imagenUrl } = req.body;

        const nuevoLibro = new Book({
            titulo,
            autor,
            descripcion,
            precio,
            stock,
            imagenUrl
        });

        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el libro', error: error.message });
    }
};

// PUT: Actualizar información de un libro (Solo Admin)
const actualizarLibro = async (req, res) => {
    try {
        const libroActualizado = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Esto asegura que Mongoose devuelva el documento ya modificado
        );

        if (!libroActualizado) {
            return res.status(404).json({ mensaje: 'Libro no encontrado para actualizar' });
        }

        res.json(libroActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el libro', error: error.message });
    }
};

// DELETE: Eliminar un libro del inventario (Solo Admin)
const eliminarLibro = async (req, res) => {
    try {
        const libroEliminado = await Book.findByIdAndDelete(req.params.id);
        
        if (!libroEliminado) {
            return res.status(404).json({ mensaje: 'Libro no encontrado para eliminar' });
        }

        res.json({ mensaje: 'Libro eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el libro', error: error.message });
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};