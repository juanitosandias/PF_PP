// frontend/src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:3000/api/auth/login', {
        correo, password
      });
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/'); 
    } catch (error) {
      toast.error(error.response?.data?.mensaje || 'Credenciales incorrectas');
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
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
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
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;