// frontend/src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [misPedidos, setMisPedidos] = useState([]);
  const navigate = useNavigate();
  
  // Extraemos los datos del usuario actual
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Si no hay token, lo mandamos al login por seguridad
    if (!token) {
      navigate('/login');
      return;
    }

    const cargarMisPedidos = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const respuesta = await axios.get('http://localhost:3000/api/orders/mis-pedidos', config);
        setMisPedidos(respuesta.data);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      }
    };

    cargarMisPedidos();
  }, [token, navigate]);

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Tarjeta de información del usuario */}
      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Mi Perfil</h2>
        <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {usuario?.nombre}</p>
        <p style={{ margin: '5px 0' }}><strong>Correo:</strong> {usuario?.correo}</p>
        <p style={{ margin: '5px 0' }}><strong>Rol:</strong> {usuario?.rol}</p>
      </div>

      {/* Historial de Compras */}
      <h2>Mis Compras Anteriores</h2>
      
      {misPedidos.length === 0 ? (
        <p style={{ color: '#64748b' }}>Aún no has realizado ninguna compra.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {misPedidos.map(pedido => (
            <div key={pedido._id} style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Pedido ID: {pedido._id}</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>{new Date(pedido.createdAt).toLocaleDateString()}</span>
              </div>
              
              <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                {pedido.articulos.map((art, index) => (
                  <li key={index}>
                    <strong>{art.cantidad}x</strong> {art.titulo} - ${art.precio}
                  </li>
                ))}
              </ul>
              
              <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '18px', color: '#10b981' }}>
                Total: ${pedido.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;