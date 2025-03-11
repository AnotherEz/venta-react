import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/slidebar";
import Home from "../pages/home";
import ReporteVentasUI from "../pages/reportes";
import Boleta from "../components/comprobante"; // Importamos el componente de la boleta
import Ventas from "../pages/registra-venta";

const AppRoutes = () => {
  // Datos de prueba para la boleta
  const datosBoleta = {
    empresa: {
      nombre: "TIENDA ABARROTES S.A.C.",
      ruc: "20283729683",
      direccion: "AV. SÁNCHEZ CERRO 4129",
      ciudad: "PIURA - PIURA - CASTILLA",
    },
    tipoDocumento: "BOLETA",
    fecha: "01/03/2025",
    hora: "04:37:12",
    productos: [
      { descripcion: "Arroz Extra 5kg", precio: 30.00 },
    ],
    subtotal: 30.00,
    descuento: 0.50,
    total: 29.50,
    cajero: "Edison Fernández",
    dni: "74839843", // Si hay DNI, se muestra como boleta con cliente
    ruc: "", // Si hay RUC, se convierte en factura
    razonSocial: "",
    codigoVenta: "02",
    referencia: "Ref:798776",
    qrUrl: "https://via.placeholder.com/80", // Código QR de prueba
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Home />
          </div>
        </div>
      } />

      <Route path="/ventas" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
           <Ventas />
            <Boleta datos={datosBoleta} /> {/* Enviamos los datos de la boleta */}
          </div>
        </div>
      } />

      <Route path="/reportes" element={
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <ReporteVentasUI />
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;
