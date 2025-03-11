import React, { useState, useEffect } from "react";
import "./../assets/carrito.css";

export default function ListaCarritoUI({ carrito, setCarrito, productos, setProductos, setTotalCarrito }) {
  const [total, setTotal] = useState(0);

  // 🔄 **Calcular total y enviarlo al componente padre**
  useEffect(() => {
    const totalCalculado = carrito.reduce((acc, producto) => acc + producto.subtotal, 0);
    setTotal(totalCalculado);
    setTotalCarrito(totalCalculado); // 🔹 Enviamos el total actualizado al componente padre
  }, [carrito, setTotalCarrito]);

  // 🆕 **Vaciar el carrito cuando el total llegue a 0 (después de una venta)**
  useEffect(() => {
    if (total === 0) {
      setCarrito([]); // 🔹 Vaciar el carrito
    }
  }, [total, setCarrito]);

  // 🆕 **Actualizar stock después de una venta**
  useEffect(() => {
    if (carrito.length === 0) {
      setProductos((prevProductos) =>
        prevProductos.map((prod) => ({
          ...prod,
          stock_disponible: prod.stock_disponible + (prod.vendido || 0),
        }))
      );
    }
  }, [carrito, setProductos]);

  // ❌ **Eliminar producto del carrito y restaurar stock**
  const eliminarDelCarrito = (productoSeleccionado, cantidad) => {
    if (!productoSeleccionado) {
      alert("⚠️ Selecciona un producto antes de eliminar.");
      return;
    }

    const productoExistente = carrito.find((p) => p.id_producto === productoSeleccionado.id_producto);

    if (!productoExistente) {
      alert("⚠️ El producto no está en el carrito.");
      return;
    }

    let nuevoCarrito;
    if (productoExistente.cantidad > cantidad) {
      // Reducir cantidad en el carrito
      nuevoCarrito = carrito.map((p) =>
        p.id_producto === productoSeleccionado.id_producto
          ? { ...p, cantidad: p.cantidad - cantidad }
          : p
      );
    } else {
      // Eliminar producto del carrito
      nuevoCarrito = carrito.filter((p) => p.id_producto !== productoSeleccionado.id_producto);
    }

    setCarrito(nuevoCarrito);

    // **Restaurar stock en la lista de productos**
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.id_producto === productoSeleccionado.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible + cantidad }
          : prod
      )
    );
  };

  return (
    <div className="carrito-lista-container">
      <h2 className="titulo">Carrito</h2>
      {carrito.length === 0 ? (
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
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.cantidad}</td>
                  <td>{`S/ ${(parseFloat(producto.precio_unitario) || 0).toFixed(2)}`}</td>
                  <td>{`S/ ${(parseFloat(producto.precio_normal) || 0).toFixed(2)}`}</td>
                  <td>{`S/ ${(parseFloat(producto.descuento) || 0).toFixed(2)}`}</td>
                  <td>{`S/ ${(parseFloat(producto.subtotal) || 0).toFixed(2)}`}</td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDelCarrito(producto, 1)}
                    >
                      ❌
                    </button>
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
