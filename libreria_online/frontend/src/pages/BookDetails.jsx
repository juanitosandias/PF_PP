// frontend/src/pages/BookDetails.jsx
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const BookDetails = () => {
  // Extraemos el :id dinámico de la URL
  const { id } = useParams(); 
  
  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:3000/api/books/${id}`);
        setLibro(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al traer los detalles del libro:", error);
        setCargando(false);
      }
    };
    fetchLibro();
  }, [id]);

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando información del libro...</div>;
  if (!libro) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Libro no encontrado.</div>;

  return (
    <div className="detalle-wrapper">
      <Link to="/" style={{ color: '#64748b', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', fontWeight: 'bold' }}>
        ← Volver al catálogo
      </Link>

      <motion.div 
        className="detalle-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Lado Izquierdo: Imagen */}
        <div>
          {libro.imagenUrl ? (
            <img src={libro.imagenUrl} alt={libro.titulo} className="detalle-imagen" />
          ) : (
            <div style={{ width: '100%', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '8px' }}></div>
          )}
        </div>

        {/* Lado Derecho: Especificaciones */}
        <div className="detalle-info">
          <h1>{libro.titulo}</h1>
          <p className="autor">por {libro.autor}</p>
          
          <div className="badge-stock">
            {libro.stock > 0 ? `Stock disponible: ${libro.stock} unidades` : 'Agotado'}
          </div>

          <p className="precio">${libro.precio}</p>
          
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Sinopsis del libro</h3>
          <p className="descripcion">{libro.descripcion}</p>

          {/* Acciones */}
          <div style={{ marginTop: 'auto' }}>
            <button 
              className="btn-agregar" 
              onClick={() => agregarAlCarrito(libro)}
              disabled={libro.stock === 0}
              style={{ padding: '15px', fontSize: '18px', opacity: libro.stock === 0 ? 0.5 : 1 }}
            >
              {libro.stock > 0 ? '🛒 Agregar al Carrito' : 'Sin inventario'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetails;