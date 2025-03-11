import React, { useState, useEffect } from "react";
import TablaVentas from "./../components/tablaVentas";
import { obtenerVentas } from "./../services/ventaService";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "./../assets/reportes.css";

export default function ReporteVentasUI() {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState("");

  // Cargar las ventas desde la API
  useEffect(() => {
    async function cargarVentas() {
      const data = await obtenerVentas();
      setVentas(data);
    }
    cargarVentas();
  }, []);

  // Filtrar ventas solo por cliente o vendedor
  const ventasFiltradas = ventas.filter((venta) => {
    return (
      venta.nombreCliente.toLowerCase().includes(filtro.toLowerCase()) ||
      venta.nombreVendedor.toLowerCase().includes(filtro.toLowerCase()) ||
      venta.id.toString().includes(filtro) ||
      venta.importe_total.toString().includes(filtro)
    );
  });

  // Generar Excel
  const generarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(ventasFiltradas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "reporte_ventas.xlsx");
  };

  // Generar PDF
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ventas", 10, 10);
    let y = 20;
    ventasFiltradas.forEach((venta, index) => {
      doc.text(`${index + 1}. ${venta.nombreCliente} - S/ ${venta.importe_total}`, 10, y);
      y += 10;
    });
    doc.save("reporte_ventas.pdf");
  };

  return (
    <div className="reporte-container">
      <h2 className="titulo">Reporte de Ventas</h2>

      {/* Filtros */}
      <div className="filtros">
        <div className="campo filtro-busqueda">
          <input
            type="text"
            placeholder="🔍 Busca por cliente, vendedor, ID o importe"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="botones-reporte">
        <button className="btn excel" onClick={generarExcel}>Generar Excel</button>
        <button className="btn generar" onClick={generarPDF}>Generar PDF</button>
      </div>

      {/* Tabla de Ventas */}
      <TablaVentas filtro={filtro} ventas={ventasFiltradas} />
    </div>
  );
}
