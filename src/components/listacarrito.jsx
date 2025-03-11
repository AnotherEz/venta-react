import React, { useState, useEffect } from "react";
import { obtenerCarritoPorId } from "./../services/carritoService";
import "./../assets/carrito.css";

export default function ListaCarritoUI({ clienteId, reloadCarrito }) {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔄 Función para obtener el carrito
  const fetchCarrito = async () => {
    if (!clienteId) return;
    try {
      setLoading(true);
      const result = await obtenerCarritoPorId(clienteId);
      console.log("📌 Datos del carrito obtenidos:", result);

      if (result && result.productos) {
        setCarrito(result.productos);
        setTotal(result.total || 0);
      } else {
        setCarrito([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("⚠️ Error al obtener el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, [clienteId, reloadCarrito]);

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
      <th>Categoría</th>
      <th>Presentación</th>
      <th>Cantidad</th>
      <th>Precio Unitario</th>
      <th>Precio Normal</th>
      <th>Descuento</th>
      <th>Subtotal</th>
    </tr>
  </thead>
  <tbody>
    {carrito.map((producto) => (
      <tr key={producto.id}>
        <td>{producto.codigo || "N/A"}</td>
        <td>{producto.nombre || "Producto sin nombre"}</td>
        <td>{producto.categoria || "N/A"}</td>
        <td>{producto.presentacion || "N/A"}</td>
        <td>{producto.cantidad}</td>
        
        <td>{`S/ ${parseFloat(producto.precio_unitario || 0).toFixed(2)}`}</td>
        <td>{`S/ ${parseFloat(producto.precio_normal || 0).toFixed(2)}`}</td>
        <td>{`S/ ${parseFloat(producto.descuento || 0).toFixed(2)}`}</td>
        <td>{`S/ ${parseFloat(producto.subtotal || 0).toFixed(2)}`}</td>
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
