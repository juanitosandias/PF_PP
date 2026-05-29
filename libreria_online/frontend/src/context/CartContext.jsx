// frontend/src/context/CartContext.jsx
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

// Creamos el contexto
export const CartContext = createContext();

// Creamos el proveedor
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]); // El estado global del carrito

  // Función para agregar libros
  const agregarAlCarrito = (libro) => {
    // Verificamos si el libro ya está en el carrito
    const libroExistente = carrito.find(item => item._id === libro._id);
    
    if (libroExistente) {
      // Si ya existe, le sumamos 1 a la cantidad
      setCarrito(carrito.map(item => 
        item._id === libro._id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      // Si no existe, lo agregamos con cantidad inicial de 1
      setCarrito([...carrito, { ...libro, cantidad: 1 }]);
    }
    toast.success(`"${libro.titulo}" se agregó al carrito 🛒`);
  };

  // Función para quitar libros del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item._id !== id));
  };

  // Función para vaciar todo el carrito (para cuando se complete la compra)
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    // Compartimos las variables y funciones con el resto de la aplicación
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};