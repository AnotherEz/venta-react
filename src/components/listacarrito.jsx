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
          <tr>
            <td>BD001</td>
            <td>Audífonos Bluetooth</td>
            <td>Caja</td>
            <td>2</td>
            <td>S/ 9.00</td>
            <td>S/ 18.00</td>
            <td>S/ 1.00</td>
            <td>S/ 17.00</td>
          </tr>

          {/* Productos de abarrotes */}
          <tr>
            <td>HS002</td>
            <td>Arroz Extra</td>
            <td>Bolsa 5kg</td>
            <td>1</td>
            <td>S/ 15.00</td>
            <td>S/ 15.00</td>
            <td>S/ 0.50</td>
            <td>S/ 14.50</td>
          </tr>

          <tr>
            <td>003</td>
            <td>Azúcar Rubia</td>
            <td>Bolsa 2kg</td>
            <td>3</td>
            <td>S/ 8.00</td>
            <td>S/ 24.00</td>
            <td>S/ 0.60</td>
            <td>S/ 23.40</td>
          </tr>

          <tr>
            <td>004</td>
            <td>Aceite Vegetal</td>
            <td>Botella 1L</td>
            <td>2</td>
            <td>S/ 12.00</td>
            <td>S/ 24.00</td>
            <td>S/ 1.00</td>
            <td>S/ 23.00</td>
          </tr>

          <tr>
            <td>005</td>
            <td>Leche Evaporada</td>
            <td>Lata 400ml</td>
            <td>6</td>
            <td>S/ 4.50</td>
            <td>S/ 27.00</td>
            <td>S/ 1.20</td>
            <td>S/ 25.80</td>
          </tr>

          <tr>
            <td>006</td>
            <td>Fideos Tallarín</td>
            <td>Paquete 500g</td>
            <td>4</td>
            <td>S/ 5.50</td>
            <td>S/ 22.00</td>
            <td>S/ 0.80</td>
            <td>S/ 21.20</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
