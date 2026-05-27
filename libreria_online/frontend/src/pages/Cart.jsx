// frontend/src/pages/Cart.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  // Calculamos el total a pagar sumando (precio * cantidad) de cada libro
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // Función para el botón de pago

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("Debes iniciar sesión para poder comprar.");
      return;
    }

    try {
      // 1. Configuramos el Token de autorización
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // 2. Mapeamos el carrito para enviarlo con la estructura que espera el modelo Order.js
      const datosPedido = {
        articulos: carrito.map(item => ({
          libroId: item._id,
          titulo: item.titulo,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: total
      };

      // 3. Enviamos el POST a nuestra nueva ruta
      await axios.post('http://localhost:3000/api/orders', datosPedido, config);

      toast.success("¡Compra realizada con éxito!");
      vaciarCarrito(); // Limpiamos el carrito tras pagar
      
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la compra.");
    }
  };

  // Si el carrito está vacío, mostramos un mensaje amigable
  if (carrito.length === 0) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>Parece que aún no has agregado ningún libro.</p>
        <Link to="/" style={{ backgroundColor: '#4f46e5', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // Si hay artículos, mostramos la lista y el total
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Resumen de tu Compra</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {carrito.map((libro) => (
          <div key={libro._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {libro.imagenUrl ? (
                <img src={libro.imagenUrl} alt={libro.titulo} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              ) : (
                <div style={{ width: '60px', height: '80px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
              )}
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{libro.titulo}</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Cantidad: {libro.cantidad} x ${libro.precio}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>
                ${libro.precio * libro.cantidad}
              </p>
              <button 
                onClick={() => eliminarDelCarrito(libro._id)}
                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Quitar
              </button>
            </div>
            
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'right' }}>
        <h3 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>
          Total a pagar: <span style={{ color: '#10b981' }}>${total}</span>
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
          <button 
            onClick={vaciarCarrito}
            style={{ backgroundColor: '#cbd5e1', color: '#334155', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Vaciar Carrito
          </button>
          <button 
            onClick={handleCheckout}
            style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;