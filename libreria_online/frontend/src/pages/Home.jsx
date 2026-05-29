// frontend/src/pages/Home.jsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [libros, setLibros] = useState([]);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/api/books');
        setLibros(respuesta.data);
      } catch (error) {
        console.error("Error al traer libros:", error);
      }
    };
    fetchLibros();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        Descubre tu próxima lectura
      </motion.h1>

      <div className="grid-libros">
        {libros.map((libro, index) => (
          <motion.div 
            key={libro._id} 
            className="tarjeta-libro"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              {libro.imagenUrl ? (
                <img src={libro.imagenUrl} alt={libro.titulo} />
              ) : (
                <div style={{ width: '100%', height: '300px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '15px' }}></div>
              )}
              <h3 style={{ margin: '0 0 5px 0' }}>{libro.titulo}</h3>
              <p style={{ margin: '0 0 15px 0', color: 'var(--color-texto-ligero)' }}>{libro.autor}</p>
            </div>
            
            {/* Botones  */}
            <div>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--color-exito)', margin: '0 0 15px 0' }}>
                ${libro.precio}
              </p>
              
              {/* botón secundario que te lleva a la página de detalles */}
              <Link to={`/libro/${libro._id}`} className="btn-secundario">
                Ver Detalles
              </Link>
              
              {/* El botón primario para el carrito */}
              <button 
                className="btn-agregar"
                onClick={() => agregarAlCarrito(libro)}
              >
                Agregar al Carrito
              </button>
            </div>
            {/* ----------------------------------------------- */}

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;