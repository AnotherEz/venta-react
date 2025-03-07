import React, { useEffect, useState } from "react";
import { obtenerVentas } from "./../services/ventasService.js"; // Importamos el servicio
import "./../assets/tablaVentas.css"; // Archivo de estilos

export default function TablaVentas({ filtro }) {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const cargarVentas = async () => {
      const data = await obtenerVentas(); // Llamamos al servicio
      setVentas(data);
    };
    cargarVentas();
  }, []);

  // Filtrar datos según búsqueda
  const ventasFiltradas = ventas.filter((venta) =>
    Object.values(venta).some((valor) =>
      valor.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <div className="tabla-container">
      <table className="tabla-ventas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendedor</th>
            <th>Nombre Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tipo Comprobante</th>
            <th>Serie</th>
            <th>Correlativo</th>
            <th>Importe Total</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.length > 0 ? (
            ventasFiltradas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.codigo}</td>
                <td>{venta.vendedor}</td>
                <td>{venta.cliente}</td>
                <td>{venta.fecha}</td>
                <td>{venta.hora}</td>
                <td>{venta.comprobante}</td>
                <td>{venta.serie}</td>
                <td>{venta.correlativo}</td>
                <td>S/ {parseFloat(venta.importe).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
