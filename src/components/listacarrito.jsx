import React from "react";
import "./../assets/listacarrito.css";

export default function ListaCarritoUI() {
  return (
    <div className="carrito-lista-container">
      <h2 className="titulo">Carrito</h2>
      <table className="tabla-carrito">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre Producto</th>
            <th>Presentación</th>
            <th>Cantidad</th>
            <th>Precio x Unidad</th>
            <th>Precio Normal</th>
            <th>Descuento</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {/* Producto anterior */}
          

          {/* Productos de abarrotes */}
          {/* <tr>
            <td>HS002</td>
            <td>Arroz Extra</td>
            <td>Bolsa 5kg</td>
            <td>1</td>
            <td>S/ 15.00</td>
            <td>S/ 15.00</td>
            <td>S/ 0.50</td>
            <td>S/ 14.50</td>
          </tr> */}

          

        </tbody>
      </table>
    </div>
  );
}
