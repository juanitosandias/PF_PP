// frontend/src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        nombre, correo, password
      });
      toast.success('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="auth-wrapper">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre:</label>
            <input 
              type="text" 
              className="input-field"
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Correo Electrónico:</label>
            <input 
              type="email" 
              className="input-field"
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              className="input-field"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-submit">
            Registrarse
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;