import React, { useEffect, useState } from "react";
import { obtenerVentas } from "./../services/ventasService.js"; // Importamos el servicio

export default function TablaVentas({ filtro }) {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el loader

  useEffect(() => {
    const cargarVentas = async () => {
      setLoading(true); // Inicia el loader
      const data = await obtenerVentas(); // Llamamos al servicio
      setVentas(data);
      setLoading(false); // Finaliza el loader
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
      {loading ? ( // Si está cargando, muestra el loader
        <div className="loader">
          <div className="spinner"></div>
          <p>Cargando ventas...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
