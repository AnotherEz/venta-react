import React, { useEffect, useState } from "react";
import "./../assets/reportes.css";

export default function TablaVentas({ filtro, ventas }) {
  const [loading, setLoading] = useState(true);

  // Desactivar loader cuando ya hay ventas
  useEffect(() => {
    if (ventas.length > 0) {
      setLoading(false);
    }
  }, [ventas]);

  // Si ya filtraste en ReporteVentasUI, aquí no es estrictamente necesario filtrar de nuevo.
  // Pero se puede mantener en caso de que quieras tener un filtrado adicional.
  const ventasFiltradas = ventas.filter((venta) =>
    Object.values(venta).some((valor) =>
      valor?.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <div className="tabla-container">
      {loading ? (
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
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Tipo Comprobante</th>
              <th>Importe Total</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.length > 0 ? (
              ventasFiltradas.map((venta) => {
                // Asumiendo que "fecha" y "hora" ya vienen formateados correctamente desde la API
                return (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.nombreVendedor || "Sin Vendedor"}</td>
                    <td>{venta.nombreCliente || "Sin Cliente"}</td>
                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                    <td>{venta.hora}</td>
                    <td>{venta.tipo_comprobante}</td>
                    <td>S/ {parseFloat(venta.importe_total).toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
