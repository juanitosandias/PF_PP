// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // <-- Importar useContext
import { CartContext } from '../context/CartContext'; // <-- Importar nuestro contexto

const Navbar = () => {
  const navigate = useNavigate();
  // Extraemos la variable 'carrito' de nuestro contexto
  const { carrito } = useContext(CartContext); 
  
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Calculamos la cantidad total de artículos sumando las cantidades
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login'; 
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#1e293b', color: 'white', marginBottom: '20px' }}>
      
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
          📚 Librería MERN
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        {/* ÍCONO DEL CARRITO */}
        <Link to="/cart" style={{ textDecoration: 'none', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          🛒 <span style={{ backgroundColor: '#f59e0b', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', fontWeight: 'bold' }}>
            {totalArticulos}
          </span>
        </Link>

        {token ? (
          <>
            <Link to="/perfil" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 'bold' }}>
                Hola, {usuario?.nombre}
            </Link>
            {usuario?.rol === 'admin' && (
              <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>⚙️ Panel Admin</Link>
            )}
            <button onClick={cerrarSesion} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Iniciar Sesión</Link>
            <Link to="/register" style={{ backgroundColor: '#4f46e5', color: 'white', textDecoration: 'none', padding: '8px 15px', borderRadius: '5px' }}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;