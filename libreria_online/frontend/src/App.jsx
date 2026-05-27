// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- 1. Importamos el Toaster
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          
          {/* 2. Colocamos el Toaster aquí. Puedes cambiar la posición a top-right, bottom-center, etc. */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                borderRadius: '8px',
              }
            }} 
          />

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/libro/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
