// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const [libros, setLibros] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const cargarLibros = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/books');
      setLibros(respuesta.data);
    } catch (error) {
      console.error('Error al cargar libros:', error);
    }
  };

  const cargarPedidos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/orders', config);
      setPedidos(respuesta.data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    }
  };

  useEffect(() => {
    cargarLibros();
    cargarPedidos();
  }, []);

  const handleCrearLibro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/books', {
        titulo, autor, descripcion, precio: Number(precio), stock: Number(stock), imagenUrl
      }, config);
      toast.success('¡Libro agregado exitosamente!');
      setTitulo(''); setAutor(''); setDescripcion(''); setPrecio(''); setStock(''); setImagenUrl('');
      cargarLibros();
    } catch (err) {
      toast.error(err.response?.data?.mensaje || 'Error al crear el libro.');
    }
  };

  const ejecutarEliminacion = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`, config);
      toast.success('Libro eliminado correctamente');
      cargarLibros();
    } catch (err) {
      toast.error(err.response?.data?.mensaje || 'Error al eliminar el libro');
    }
  };

  const handleEliminarLibro = (id) => {
    toast((t) => (
      <div>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>¿Seguro que deseas eliminar este libro?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => { toast.dismiss(t.id); ejecutarEliminacion(id); }}
            className="btn-danger"
          >Sí, eliminar</button>
          <button 
            onClick={() => toast.dismiss(t.id)}
            style={{ backgroundColor: '#e2e8f0', padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >Cancelar</button>
        </div>
      </div>
    ), { id: id });
  };

  return (
    <div className="admin-wrapper">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="admin-grid"
      >
        {/* Formulario */}
        <div className="admin-panel">
          <h2>➕ Agregar Libro</h2>
          <form onSubmit={handleCrearLibro}>
            <div className="input-group"><input type="text" className="input-field" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required /></div>
            <div className="input-group"><input type="text" className="input-field" placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} required /></div>
            <div className="input-group"><textarea className="input-field" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required /></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="input-group" style={{ flex: 1 }}><input type="number" className="input-field" placeholder="Precio ($)" value={precio} onChange={e => setPrecio(e.target.value)} required /></div>
              <div className="input-group" style={{ flex: 1 }}><input type="number" className="input-field" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required /></div>
            </div>
            <div className="input-group"><input type="text" className="input-field" placeholder="URL Imagen" value={imagenUrl} onChange={e => setImagenUrl(e.target.value)} /></div>
            <button type="submit" className="btn-submit">Guardar en Catálogo</button>
          </form>
        </div>

        {/* Tabla de Inventario */}
        <div className="admin-panel">
          <h2>📦 Inventario ({libros.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {libros.map(libro => (
                  <tr key={libro._id}>
                    <td><strong>{libro.titulo}</strong></td>
                    <td>{libro.autor}</td>
                    <td style={{ color: 'var(--color-exito)', fontWeight: 'bold' }}>${libro.precio}</td>
                    <td>{libro.stock} u.</td>
                    <td>
                      <button onClick={() => handleEliminarLibro(libro._id)} className="btn-danger">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Historial de Ventas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="admin-panel"
      >
        <h2>🧾 Historial de Ventas ({pedidos.length})</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(pedido => (
                <tr key={pedido._id}>
                  <td style={{ fontSize: '13px', color: '#64748b' }}>{pedido._id}</td>
                  <td>
                    <strong>{pedido.usuario?.nombre}</strong><br/>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>{pedido.usuario?.correo}</span>
                  </td>
                  <td>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                      {pedido.articulos.map((art, index) => (
                        <li key={index}>{art.cantidad}x {art.titulo}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ color: 'var(--color-exito)', fontWeight: 'bold' }}>${pedido.total}</td>
                  <td style={{ fontSize: '14px' }}>{new Date(pedido.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;