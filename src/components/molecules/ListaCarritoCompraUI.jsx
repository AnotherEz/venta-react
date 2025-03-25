// src/components/molecules/ListaCarritoCompraUI.jsx
import React, { useState, useEffect } from "react";


export default function ListaCarritoCompraUI({
  carrito,
  setCarrito,
  setTotalCarrito,
  productos,
  setProductos,
}) {
  const [total, setTotal] = useState(0);

  // Calcular total
  useEffect(() => {
    const totalCalc = carrito.reduce((acc, item) => acc + (item.subtotal || 0), 0);
    setTotal(totalCalc);
    setTotalCarrito(totalCalc);
  }, [carrito, setTotalCarrito]);

  // Eliminar item
  const eliminarItem = (item) => {
    const nuevoCarrito = carrito.filter((p) => p.id_producto !== item.id_producto);
    setCarrito(nuevoCarrito);

    // Restaurar stock
    const unidades = (item.cantidadLotes || 0) * (item.cantidadPorLote || 0);
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id_producto === item.id_producto
          ? { ...prod, stock_disponible: prod.stock_disponible + unidades }
          : prod
      )
    );
  };

  return (
    <div className="compras-carrito-lista-container">
      <h2 className="titulo">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="compras-empty-text">No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="compras-tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Presentación</th>
                <th>Cant. Lotes</th>
                <th>Precio x Lote</th>
                <th>Cant. Total</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => {
                const unidades = (item.cantidadLotes || 0) * (item.cantidadPorLote || 0);
                return (
                  <tr key={item.id_producto}>
                    <td>{item.nombre}</td>
                    <td>{item.presentacion}</td>
                    <td>{item.cantidadLotes}</td>
                    <td>S/ {(item.precioPorLote || 0).toFixed(2)}</td>
                    <td>{unidades}</td>
                    <td>S/ {(item.subtotal || 0).toFixed(2)}</td>
                    <td>
                      <button
                        className="compras-btn-eliminar"
                        onClick={() => eliminarItem(item)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="compras-total">
            <strong>Total: S/ {total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}
