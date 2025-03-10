
import React, { useState, useEffect } from "react";
import { obtenerCarritoPorCliente, agregarProductoAlCarrito, eliminarProductoDelCarrito } from "./../services/carritoService"; // Servicios API
import "./../assets/carrito.css"; // Estilos del carrito

export default function ListaCarritoUI({ clienteId }) {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarrito = async () => {
      if (!clienteId) return;

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
  }, [clienteId]);

  // 🔹 Incrementar cantidad de un producto
  const handleIncrementarCantidad = async (producto) => {
    try {
      const response = await agregarProductoAlCarrito(clienteId, { ...producto, cantidad: 1 });
      if (response) {
        setCarrito((prevCarrito) =>
          prevCarrito.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          )
        );
        setTotal((prevTotal) => prevTotal + producto.precio_unitario);
      }
    } catch (error) {
      alert("Error al agregar producto.");
    }
  };

  // 🔹 Reducir cantidad de un producto
  const handleReducirCantidad = async (producto) => {
    if (producto.cantidad === 1) {
      // Si la cantidad es 1, eliminar producto
      handleEliminarProducto(producto.id);
    } else {
      try {
        const response = await agregarProductoAlCarrito(clienteId, { ...producto, cantidad: -1 });
        if (response) {
          setCarrito((prevCarrito) =>
            prevCarrito.map((item) =>
              item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item
            )
          );
          setTotal((prevTotal) => prevTotal - producto.precio_unitario);
        }
      } catch (error) {
        alert("Error al reducir producto.");
      }
    }
  };

  // 🔹 Eliminar producto completamente del carrito
  const handleEliminarProducto = async (productoId) => {
    try {
      const response = await eliminarProductoDelCarrito(clienteId, productoId);
      if (response) {
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
        setTotal((prevTotal) => prevTotal - response.subtotal);
      }
    } catch (error) {
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <div className="carrito-lista-container">
      <h2 className="titulo">Carrito</h2>

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
                <th>Acciones</th>
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
                  <td>
                    <button className="btn-menos" onClick={() => handleReducirCantidad(producto)}>-</button>
                    <button className="btn-mas" onClick={() => handleIncrementarCantidad(producto)}>+</button>
                    <button className="btn-eliminar" onClick={() => handleEliminarProducto(producto.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            <div>Total: <strong>S/ {total.toFixed(2)}</strong></div>
          </div>
        </>
      )}
    </div>
  );
}
