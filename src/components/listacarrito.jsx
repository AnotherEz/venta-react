import React, { useState, useEffect } from "react";
import { obtenerCarritoPorCliente, agregarProductoAlCarrito, vaciarCarrito } from "./../services/carritoService"; // Importamos el servicio
import "./../assets/carrito.css"; // Estilos del carrito

export default function ListaCarritoUI({ clienteId }) {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Obtener el carrito cuando el clienteId cambie
  useEffect(() => {
    const fetchCarrito = async () => {
      if (!clienteId) return; // Si no hay cliente, no buscar el carrito

      try {
        setLoading(true);
        const result = await obtenerCarritoPorCliente(clienteId);
        
        if (result && result.productos) {
          setCarrito(result.productos);
          setTotal(result.total || 0);
        } else {
          setCarrito([]);
          setTotal(0);
        }
      } catch (error) {
        alert("Error al obtener el carrito");
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, [clienteId]); // Se ejecuta cada vez que cambia el clienteId

  // Función para agregar un producto al carrito
  const handleAgregarProducto = async (producto) => {
    try {
      const response = await agregarProductoAlCarrito(clienteId, producto);
      if (response) {
        // Actualizar el estado del carrito
        setCarrito([...carrito, response]);
        setTotal((prevTotal) => prevTotal + response.subtotal);
      }
    } catch (error) {
      alert("Error al agregar el producto al carrito.");
    }
  };

  // Función para vaciar el carrito
  const handleVaciarCarrito = async () => {
    try {
      const success = await vaciarCarrito(clienteId);
      if (success) {
        setCarrito([]);
        setTotal(0);
      }
    } catch (error) {
      alert("Error al vaciar el carrito.");
    }
  };

  return (
    <div className="carrito-lista-container">
      <h2 className="titulo">Carrito</h2>

      {/* Loader mientras se carga el carrito */}
      {loading ? (
        <p className="loading-text">Cargando carrito...</p>
      ) : carrito.length === 0 ? (
        <p className="empty-text">No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre Producto</th>
                <th>Presentación</th>
                <th>Cantidad</th>
                <th>Precio x Unidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.precio_unitario ? `S/ ${producto.precio_unitario.toFixed(2)}` : "S/ 0.00"}</td>
                  <td>{producto.subtotal ? `S/ ${producto.subtotal.toFixed(2)}` : "S/ 0.00"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mostrar el total de la compra */}
          <div className="total">
            <div>Total: <strong>S/ {total.toFixed(2)}</strong></div>
          </div>

          {/* Botones de acción */}
          <div className="acciones-carrito">
            <button className="btn-agregar" onClick={() => handleAgregarProducto({ codigo: "12345", nombre: "Producto demo", cantidad: 1, precio_unitario: 10 })}>Agregar Producto de Ejemplo</button>
            <button className="btn-vaciar" onClick={handleVaciarCarrito}>Vaciar Carrito</button>
          </div>
        </>
      )}
    </div>
  );
}
