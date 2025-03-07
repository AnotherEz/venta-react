import React, { useState } from "react";
import TablaVentas from "./../components/tablaVentas";
import "./../assets/reportes.css"; // Archivo de estilos

export default function ReporteVentasUI() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoReporte, setTipoReporte] = useState("General");
  const [filtro, setFiltro] = useState("");

  return (
    <div className="reporte-container">
      <h2 className="titulo">Reporte de Ventas</h2>

      {/* Sección de filtros */}
      <div className="filtros">
        <div className="campo">
          <label>Fecha inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Fecha fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Tipo de reporte</label>
          <select value={tipoReporte} onChange={(e) => setTipoReporte(e.target.value)}>
            <option>General</option>
            <option>Diario</option>
            <option>Semanal</option>
            <option>Mensual</option>
          </select>
        </div>

        <div className="campo filtro-busqueda">
          <input
            type="text"
            placeholder="🔍 Busca por nombre vendedor, ID, cliente o importe"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="botones-reporte">
        <button className="btn excel">Generar Reporte en Excel</button>
        <button className="btn generar">Generar Reporte</button>
        <button className="btn imprimir">Imprimir Reporte</button>
      </div>

      {/* Componente de la tabla de ventas */}
      <TablaVentas filtro={filtro} />
    </div>
  );
}
